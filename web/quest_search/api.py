from django.http import HttpResponse, JsonResponse
from questx.models import Experience, Quest, MemberProfile, ManagerProfile

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import permission_classes

from quest_search.utils import embed_query_string, get_pinecone_client
from quest_search.serializers import QuestSearchSerializer


class QuestSearchAPI(generics.RetrieveAPIView):
    serializer_class = QuestSearchSerializer

    def get(self, request):
        serializer = self.get_serializer(data=request.GET)
        
        serializer.is_valid(raise_exception=True)
        query = serializer.validated_data['query']

        try:
            client = get_pinecone_client()
            vdb_index = client.Index('questx')
            query_vector = embed_query_string(query=query)
            assert query_vector, "Query vector is None, GEMINI error"
            results = vdb_index.query(
                namespace="quests", 
                vector=query_vector,
                # include_values=True,
                top_k=10,
            )  # Replace with actual search logic
            res = {}
            quest_scores = {match['id']:match['score'] for match in results['matches']}
            matched_quests = Quest.objects.filter(quest_id__in=quest_scores.keys())
            res['quests'] = [
                {'quest_id': q.quest_id, 
                'quest_title': q.quest_title, 
                'quest_description': q.quest_description,
                'quest_location': q.cm.location,
                'score': quest_scores[q.quest_id]
                } for q in matched_quests]
            
        
            return JsonResponse(res, safe=False)
        except Exception as e:
            return JsonResponse({ 'err': "Internal Server Error" }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)