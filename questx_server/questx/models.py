from django.db import models
from django.core.validators import RegexValidator, MinLengthValidator, EmailValidator, MaxLengthValidator

from django.utils.translation import gettext as _
from django.utils.crypto import get_random_string

def generate_model_id(prefix):
    return prefix + get_random_string(8, allowed_chars='0123456789')

PhoneValidator = RegexValidator(
    regex = r'^(\+?81|0)-?(\d{1,4})-?(\d{1,4})-?(\d{4})$',
    message="Phone number must be in the format +81XXXXXXXXXX or 0XXXXXXXXXX",
    code='invalid_phone_number'
)

DAYNIGHT_CHOICES = (
    ('night', 'Night'),
    ('day', 'Day')
)

EXPERIENCE_TYPES = (
    ('task', 'Task'),
    ('activity', 'Activity/Event')
)

class User(models.Model):
    user_id = models.CharField(max_length=9, primary_key=True, default=generate_model_id('U'), editable=False)
    name = models.CharField(max_length=200)
    email = models.EmailField(validators=[EmailValidator()])
    password = models.CharField(max_length=20, validators=[MinLengthValidator(8, "password should be minimum of 8 charectors")])
    date_of_birth = models.DateField("Date of birth")
    joined_on = models.DateTimeField("Join date")
    user_phone = models.CharField(max_length=15, validators=[PhoneValidator])


class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    place_of_birth = models.CharField(max_length=512)
    place_of_residence = models.CharField(max_length=512)
    members_details = models.JSONField(default = list)
    specialization = models.JSONField(name="field of specialization", default = list)
    hobby = models.JSONField(default = list)
    notices = models.JSONField(default = list)
    expectations = models.CharField()
    concern = models.CharField()


class CommunityManager(models.Model):
    # question = models.ForeignKey(Question, on_delete=models.CASCADE)
    cm_id = models.CharField(max_length=9, primary_key=True, default=generate_model_id('C'), editable=False)
    name = models.CharField(max_length=200)
    email = models.EmailField(validators=[EmailValidator()])
    password = models.CharField(max_length=20, validators = [MinLengthValidator(8, "password should be minimum of 8 charectors")])
    joined_on = models.DateTimeField("Join date")
    location = models.CharField(max_length=512)
    organization = models.CharField(max_length=512)

class Quest(models.Model):
    quest_id = models.CharField(max_length=9, primary_key=True, default=generate_model_id('Q'), editable=False)
    community_manager = models.ForeignKey(CommunityManager, on_delete=models.CASCADE)
    quest_title = models.CharField(max_length=200)
    quest_description = models.CharField(max_length=512, validators=[
        MinLengthValidator(20, _("Description should be minimum 20 characters"))
    ])
    quest_exps = models.ManyToManyField(Experience, blank=True)
    quest_duration = models.PositiveIntegerField()
    quest_tags = models.JSONField(default=list)
