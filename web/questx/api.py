from rest_framework.decorators import permission_classes
from questx.models import Experience, Quest, MemberProfile, ManagerProfile
from rest_framework import viewsets, permissions
from .serializers import ExperienceSerializer, QuestSerializer, MemberProfileSerializer, ManagerProfileSerializer

# User Viewset
class ExperienceViewset(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ExperienceSerializer

class QuestViewset(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = QuestSerializer


    def get_queryset(self):
        # if not self.request.user.user_type != 'cm':
        #     raise Exception("Invalid user_type")
        return self.request.user.cm_profile.quests.all()
    
    def perform_create(self, serializer):
        self.request
        serializer.save(cm=self.request.user.cm_profile)
        
    
    

class MemberProfileViewset(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = MemberProfileSerializer

    def get_queryset(self):
        return self.request.user.member_profile
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
class ManagerProfileViewset(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = ManagerProfileSerializer

    def get_queryset(self):
        return self.request.user.cm_profile or None
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)