
from typing import List
from celery import shared_task
from questx.models import Experience, Quest
from .utils import get_pinecone_index, store_quest_vector, embed_quest_data

# @shared_task
def embed_and_store_quest(quest_id, quest_title, quest_description, experiences):
    index = get_pinecone_index()
    quest_vector = embed_quest_data(quest_title, quest_description, experiences)
    store_quest_vector(index, quest_id, quest_vector)