from rest_framework import serializers
from questx.models import Experience, User, Quest, CommunityManager, UserProfile


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__' # ('agent_name', ...)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class QuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quest
        fields = '__all__'

class CommunityManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model =  CommunityManager
        fields = '__all__'
    