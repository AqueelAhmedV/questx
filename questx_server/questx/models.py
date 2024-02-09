from django.db import models
from django.core.validators import RegexValidator, MinLengthValidator, EmailValidator


class User(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(validators=[EmailValidator()])
    password = models.CharField(validator = [MinLengthValidator(8, "password should be minimum of 8 charectors")])
    gender_and_age = models.JSONField(default = list)
    date_of_birth = models.DateField("Date of birth")
    joined_on = models.DateTimeField("Join date")
    place_of_birth = models.CharField(max_length=512)
    place_of_residence = models.CharField(max_length=512)
    specialization = models.JSONField(name="field of specialization")
    contribution_points = models.PositiveIntegerField(default=0)
    no_of_nights = models.PositiveIntegerField(default=0)
    no_of_days = models.PositiveIntegerField(default=0)
    user_phone = models.CharField(max_length=15, validators=[
        RegexValidator(
            regex=r'^\+?(81|0)\d{1,4}[ -]?\d{1,4}[ -]?\d{4}$',
            message="Phone number must be in the format +81XXXXXXXXXX or 0XXXXXXXXXX",
            code='invalid_phone_number'
        )
    ])
    hobby = models.JSONField(default = list)
    notices = models.JSONField(default = list)
    expectations = models.CharField()
    concern = models.CharField()
    

class CommunityManager(models.Model):
    # question = models.ForeignKey(Question, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    email = models.EmailField(validators=[EmailValidator()])
    password = models.CharField(validator = [MinLengthValidator(8, "password should be minimum of 8 charectors")])
    joined_on = models.DateTimeField("Join date")
    location = models.CharField(max_length=512)
    organization = models.CharField(max_length=512)

class Quest(models.Model):
    community_manager = models.ForeignKey(CommunityManager, on_delete=models.CASCADE)
    client_name = models.CharField(max_length=200)
    client_location = models.CharField(max_length=512)
    client_phone = models.CharField(max_length=15, validators=[
        RegexValidator(
            regex=r'^\+?(81|0)\d{1,4}[ -]?\d{1,4}[ -]?\d{4}$',
            message="Phone number must be in the format +81XXXXXXXXXX or 0XXXXXXXXXX",
            code='invalid_phone_number'
        )
    ])
    quest_description = models.CharField(validators=[
        MinLengthValidator(5, "Description should be minimum 5 characters")
    ])