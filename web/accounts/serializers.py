from django.conf import ENVIRONMENT_VARIABLE
from rest_framework import serializers
from .models import CustomUser, LoginModel
from django.contrib.auth import authenticate

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('first_name', 
                  'last_name', 'email', 'user_type')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('first_name', 'last_name', 'email', 'password', 'user_type')
        extra_kwargs = { 'password': {'write_only': True} }

    
    from decouple import config
    print(config('GEMINI_API_KEY'))

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            validated_data['email'],
            validated_data['user_type'],
            validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        print(user, )
        return user
    
# Login Serializer

class LoginSerializer(serializers.ModelSerializer):
    
    # email = serializers.CharField()
    # password = serializers.CharField()
    # user_type = serializers.ChoiceField(choices=USER_TYPES)

    class Meta:
        model = LoginModel
        fields = ('email', 'password', 'user_type')


    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
             return user
        raise serializers.ValidationError("Incorrect Credentials")
    

    
