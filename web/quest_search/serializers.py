from rest_framework import serializers
from rest_framework.fields import MinLengthValidator



class QuestSearchSerializer(serializers.Serializer):
    query = serializers.CharField(max_length=255, validators=[
        MinLengthValidator(4, "Query has to be atleast 4 characters")
    ])
