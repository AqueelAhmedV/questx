from django.db import models
from django.core.validators import RegexValidator, MinLengthValidator


class User(models.Model):
    name = models.CharField(max_length=200)
    date_of_birth = models.DateField("Date of birth")
    joined_on = models.DateTimeField("Join date")
    location = models.CharField(max_length=512)
    specialization = models.JSONField(name="field of specialization")
    contribution_points = models.PositiveIntegerField(default=0)


class CommunityManager(models.Model):
    # question = models.ForeignKey(Question, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
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