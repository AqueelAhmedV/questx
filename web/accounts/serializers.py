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
        email = data.get('email')
        password = data.get('password')
        user_type = data.get('user_type')

        if email and password:
            user = authenticate(email=email, password=password)

            if user:
                if user.is_active and user.user_type == user_type:
                    return user
                else:
                    raise serializers.ValidationError("Incorrect user type")
            else:
                raise serializers.ValidationError("Incorrect credentials")
        else:
            raise serializers.ValidationError("Email and password are required")

    

    
