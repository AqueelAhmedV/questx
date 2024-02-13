from typing import Any
from django.db import models
from django.core.validators import RegexValidator, MinLengthValidator, EmailValidator, BaseValidator

from django.utils.translation import gettext as _
from django.utils.crypto import get_random_string
from django.core.exceptions import ValidationError
from accounts.models import CustomUser

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



# class AccountTypeValidator(BaseValidator):
#     message = 'The selected account must be of type %(account_type)s.'
#    code = 'invalid_account_type'

#     def __init__(self, account_type, *args, **kwargs):
#         self.account_type = account_type
#         super().__init__(*args, **kwargs)

#     def __call__(self, value):
#         if value.account_type != self.account_type:
#             raise ValidationError(
#                 self.message % {'account_type': self.account_type},
#                 code=self.code,
#             )

# class Account(models.Model):
#     account_id = models.CharField(max_length=9, primary_key=True, editable=False, unique= True)
#     account_type = models.CharField(max_length=5, choices=ACCOUNT_TYPES)
#     name = models.CharField(max_length=200)
#     email = models.EmailField(validators=[EmailValidator()])
#     password = models.CharField(max_length=20, validators=[MinLengthValidator(8, "password should be minimum of 8 charectors")])
#     joined_on = models.DateTimeField(name="Join date", auto_now_add=True)
    
#     def save(self, *args, **kwargs):
#         # Generate a new custom ID if it's not already set
#         if not self.account_id:
#             self.account_id = generate_model_id(self.account_type.capitalize())
#         super().save(*args, **kwargs)


class MemberProfile(models.Model):
    user_type = 'member'
    user = models.OneToOneField(
        CustomUser, 
        related_name='member_profile',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    phone = models.CharField(max_length=15, validators=[PhoneValidator])
    date_of_birth = models.DateField("Date of birth")
    place_of_birth = models.CharField(max_length=512)
    place_of_residence = models.CharField(max_length=512)
    members_details = models.JSONField(default = list)
    specialization = models.JSONField(name="field of specialization", default = list)
    hobby = models.JSONField(default = list)
    notices = models.JSONField(default = list)
    expectations = models.CharField(max_length = 512)
    concern = models.CharField(max_length = 512)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user'], name='unique_member_profile')
        ]

    def save(self, *args, **kwargs):
        if self.user.user_type != self.user_type:
            raise ValidationError("User type does not match profile type")
        super().save(*args, **kwargs)


class ManagerProfile(models.Model):
    user_type = 'cm'
    user = models.OneToOneField(
        CustomUser, 
        related_name='cm_profile',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    name = models.CharField(max_length=200)
    email = models.EmailField(validators=[EmailValidator()])
    password = models.CharField(max_length=20, validators = [MinLengthValidator(8, "password should be minimum of 8 charectors")])
    joined_on = models.DateTimeField("Join date", auto_now_add=True)
    location = models.CharField(max_length=512)
    organization = models.CharField(max_length=512)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user'], name='unique_cm_profile')
        ]

    def save(self, *args, **kwargs):
        if self.user.user_type != self.user_type:
            raise ValidationError("User type does not match profile type")
        super().save(*args, **kwargs)


class Quest(models.Model):
    quest_id = models.CharField(max_length=9, primary_key=True, editable=False, unique= True)
    cm = models.ForeignKey(ManagerProfile, related_name='quests', on_delete=models.CASCADE, default=None)
    quest_title = models.CharField(max_length=200)
    quest_description = models.CharField(max_length=512, validators=[
        MinLengthValidator(20, _("Description should be minimum 20 characters"))
    ])
    quest_duration = models.PositiveIntegerField()
    quest_tags = models.JSONField(default=list)
    def save(self, *args, **kwargs):
        # Generate a new custom ID if it's not already set
        if not self.quest_id:
            self.quest_id = generate_model_id('Q')
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
    quest = models.ForeignKey(Quest, related_name='experiences', on_delete=models.CASCADE, default=None, blank=True, null=True)
    def save(self, *args, **kwargs):
        # Generate a new custom ID if it's not already set
        if not self.exp_id:
            self.exp_id = generate_model_id('E')
        super().save(*args, **kwargs)


