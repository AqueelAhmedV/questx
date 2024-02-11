from questx.models import Experience
from rest_framework import viewsets, permissions
from .serializers import ExperienceSerializer

# User Viewset
class ExperienceViewset(viewsets.ModelViewSet):
    queryset = Experience.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ExperienceSerializer