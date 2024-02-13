from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.crypto import get_random_string
from rest_framework.decorators import permission_classes
# Create your models here.

class CustomUserManager(BaseUserManager):
    def create_user(self, email, user_type, password, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not user_type:
            raise ValueError('Invalid User Type (member/cm)')
        if not password:
            raise ValueError('Password must be provided')
        email = self.normalize_email(email)
        user = self.model(email=email, user_type=user_type, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)
        return self.create_user(email, 'admin', password, **extra_fields)


USER_TYPES = (
    ('member', 'Member'),
    ('cm', 'Community Manager'),
    ('admin', 'Admin')
)

def generate_model_id(prefix):
    return prefix + get_random_string(8, allowed_chars='0123456789')


class CustomUser(AbstractBaseUser):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    user_type = models.CharField(max_length=10, choices=USER_TYPES)
    email = models.EmailField(unique=True)
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    objects = CustomUserManager()

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser
    

class LoginModel(models.Model):
    email = models.EmailField()
    password = models.CharField(max_length=15)
    user_type = models.CharField(choices=USER_TYPES, max_length=10)

    def save(self):
        pass