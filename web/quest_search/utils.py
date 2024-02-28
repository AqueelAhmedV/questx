

from typing import List
from decouple import config

import google.generativeai as genai
from pinecone import Pinecone, Index

from questx.models import EXPERIENCE_TYPES, Experience, Quest



genai.configure(api_key=config('GEMINI_API_KEY'), transport='rest')
model = 'models/embedding-001'

def embed_query_string(query: str):
    try:
        res = genai.embed_content(model=model, content=(query), task_type='SEMANTIC_SIMILARITY')
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
                                task_type="SEMANTIC_SIMILARITY")
    return embedding['embedding']


def get_pinecone_client():
    try:
        client = Pinecone(api_key=config('PINECONE_API_KEY'))
        return client
    except Exception as e:
        print("PINECONE: ", e)


def store_quest_vector(client: Pinecone, quest_id, quest_vector):
    index = client.Index('questx')
    index.upsert(vectors=[
        {
            "id": quest_id,
            "values": quest_vector,
        }
    ], namespace='quests')