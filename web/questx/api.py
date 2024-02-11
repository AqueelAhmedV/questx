from questx.models import Experience, User
from rest_framework import viewsets, permissions
from .serializers import ExperienceSerializer

# User Viewset
class ExperienceViewset(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ExperienceSerializer

class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]