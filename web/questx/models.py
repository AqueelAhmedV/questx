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
    user_id = models.CharField(max_length=9, primary_key=True, editable=False, unique= True)
    name = models.CharField(max_length=200)
    email = models.EmailField(validators=[EmailValidator()])
    password = models.CharField(max_length=20, validators=[MinLengthValidator(8, "password should be minimum of 8 charectors")])
    date_of_birth = models.DateField("Date of birth")
    joined_on = models.DateTimeField("Join date")
    user_phone = models.CharField(max_length=15, validators=[PhoneValidator])
    def save(self, *args, **kwargs):
        # Generate a new custom ID if it's not already set
        if not self.user_id:
            self.user_id = generate_model_id('U')
        super().save(*args, **kwargs)

class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    place_of_birth = models.CharField(max_length=512)
    place_of_residence = models.CharField(max_length=512)
    members_details = models.JSONField(default = list)
    specialization = models.JSONField(name="field of specialization", default = list)
    hobby = models.JSONField(default = list)
    notices = models.JSONField(default = list)
    expectations = models.CharField(max_length = 512)
    concern = models.CharField(max_length = 512)


class CommunityManager(models.Model):
    # question = models.ForeignKey(Question, on_delete=models.CASCADE)
    cm_id = models.CharField(max_length=9, primary_key=True, editable=False, unique= True)
    name = models.CharField(max_length=200)
    email = models.EmailField(validators=[EmailValidator()])
    password = models.CharField(max_length=20, validators = [MinLengthValidator(8, "password should be minimum of 8 charectors")])
    joined_on = models.DateTimeField("Join date")
    location = models.CharField(max_length=512)
    organization = models.CharField(max_length=512)
    def save(self, *args, **kwargs):
        # Generate a new custom ID if it's not already set
        if not self.cm_id:
            self.cm_id = generate_model_id('C')
        super().save(*args, **kwargs)

class Experience(models.Model):
    exp_id = models.CharField(max_length=9, primary_key=True, editable=False, unique= True)
    agent_name = models.CharField(max_length=200)
    agent_location = models.CharField(max_length=512)
    agent_phone = models.CharField(max_length=15, validators=[PhoneValidator])
    exp_type = models.CharField(max_length=10, choices=EXPERIENCE_TYPES)
    exp_title = models.CharField(max_length=200)
    exp_description = models.CharField(max_length=512, validators=[
        MinLengthValidator(50, _('Please describe your task in atleast 50 characters'))
    ])
    exp_duration = models.PositiveIntegerField()
    exp_preferred_time = models.CharField(max_length=10, choices=DAYNIGHT_CHOICES, default='day')
    def save(self, *args, **kwargs):
        # Generate a new custom ID if it's not already set
        if not self.exp_id:
            self.exp_id = generate_model_id('E')
        super().save(*args, **kwargs)

class Quest(models.Model):
    quest_id = models.CharField(max_length=9, primary_key=True, editable=False, unique= True)
    community_manager = models.ForeignKey(CommunityManager, on_delete=models.CASCADE)
    quest_title = models.CharField(max_length=200)
    quest_description = models.CharField(max_length=512, validators=[
        MinLengthValidator(20, _("Description should be minimum 20 characters"))
    ])
    quest_exps = models.ManyToManyField(Experience, blank=True)
    quest_duration = models.PositiveIntegerField()
    quest_tags = models.JSONField(default=list)
    def save(self, *args, **kwargs):
        # Generate a new custom ID if it's not already set
        if not self.quest_id:
            self.quest_id = generate_model_id('Q')
        super().save(*args, **kwargs)

