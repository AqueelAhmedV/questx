from django.urls import path
from rest_framework import routers
from .api import Quest, QuestSearchAPI


router = routers.DefaultRouter()
# /api/search/
urlpatterns = [
    path('quest', QuestSearchAPI.as_view()),
]