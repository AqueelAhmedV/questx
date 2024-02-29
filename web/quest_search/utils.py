

from typing import List
from decouple import config

import google.generativeai as genai
from pinecone import Pinecone, Index

from questx.models import EXPERIENCE_TYPES, Experience, Quest

from django.core.cache import cache


genai.configure(api_key=config('GEMINI_API_KEY'))
model = 'models/embedding-001'

def embed_query_string(query: str):
    try:
        res = genai.embed_content(model=model, content=(query), task_type='RETRIEVAL_QUERY')
        return res['embedding']
    except Exception as e:
        print("GEMINI: ", e)

def embed_quest_data(quest_title, quest_description, experiences) -> List:
    quest_content = (
        "Title: "
        f'{quest_title}\n'
        "Summary:\n"
        f'{quest_description}'
        "Experiences:\n"
    )
    
    for i, exp in enumerate(experiences):
        quest_content += f'{i+1}. Type: {dict(EXPERIENCE_TYPES)[exp["exp_type"]]}, Title: {exp["exp_title"]}:\n{exp["exp_description"]}'
    
    embedding = genai.embed_content(model=model,
                                content=quest_content,
                                task_type="RETRIEVAL_DOCUMENT",
                                title=quest_title)
    return embedding['embedding']


def get_pinecone_index():
    index = cache.get('pinecone_index')
    if index is None:
        try:
            client = Pinecone(api_key=config('PINECONE_API_KEY'))
            index = client.Index('questx')
            cache.set('pinecone_index', index, timeout=None)
        except Exception as e:
            print("PINECONE: ", e)
    return index


def store_quest_vector(index: Index, quest_id, quest_vector):
    index.upsert(vectors=[
        {
            "id": quest_id,
            "values": quest_vector,
        }
    ], namespace='quests')