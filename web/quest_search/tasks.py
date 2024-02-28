
from typing import List
from celery import shared_task
from questx.models import Experience, Quest
from .utils import get_pinecone_client, store_quest_vector, embed_quest_data

# @shared_task
def embed_and_store_quest(quest_id, quest_title, quest_description, experiences):
    client = get_pinecone_client()
    quest_vector = embed_quest_data(quest_title, quest_description, experiences)
    store_quest_vector(client, quest_id, quest_vector)