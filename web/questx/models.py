from typing import Any
from django.db import models
from django.core.validators import RegexValidator, MinLengthValidator, EmailValidator, BaseValidator

from django.utils.translation import gettext as _
from django.utils.crypto import get_random_string
from django.core.exceptions import ValidationError
from requests import delete
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
    quest_id = models.CharField(max_length=10, blank=True, null=True)
    def save(self, *args, **kwargs):
        # Generate a new custom ID if it's not already set
        if not self.exp_id:
            self.exp_id = generate_model_id('E')
        super().save(*args, **kwargs)



class ExperienceValidator(BaseValidator):
    invalid_message = 'Invalid Experience Id(s)'

    def __init__(self, limit_value=None):
        super().__init__(limit_value)

    def __call__(self, value):
        try:
            experiences = Experience.objects.filter(exp_id__in=value)
            if len(experiences) != len(value):
                raise ValidationError(self.invalid_message)
        except Experience.DoesNotExist:
            raise ValidationError(self.invalid_message)


def get_exp_choices():
    exps = Experience.objects.all()
    exp_id_choices = list()
    for e in exps:
        exp_id_choices.append((e.exp_id, e.exp_title)) 
    return tuple(exp_id_choices)


class Quest(models.Model):
    quest_id = models.CharField(max_length=9, primary_key=True, editable=False, unique= True)
    cm = models.ForeignKey(ManagerProfile, related_name='quests', on_delete=models.CASCADE, default=None)
    quest_title = models.CharField(max_length=200)
    quest_description = models.CharField(max_length=512, validators=[
        MinLengthValidator(20, _("Description should be minimum 20 characters"))
    ])
    quest_duration = models.PositiveIntegerField()
    quest_tags = models.JSONField(default=list, blank=True, null=True)
    exp_ids = models.JSONField(default=list, validators=[
        ExperienceValidator()
    ], help_text=get_exp_choices())

    def delete(self) -> tuple[int, dict[str, int]]:
        Experience.objects.filter(exp_id__in=self.exp_ids).update(quest_id=None)

        return super().delete()

    def save(self, *args, **kwargs):
        exps = Experience.objects.filter(exp_id__in=self.exp_ids)
        
        for exp in exps:
            if exp.quest_id and self.quest_id and exp.quest_id != self.quest_id:
                raise ValidationError(f'Experience ({exp.exp_id}) already assigned to quest ({exp.quest_id})')

        if not self.quest_id:
            self.quest_id = generate_model_id('Q')

        for exp in exps:
            if not exp.quest_id:
                exp.quest_id = self.quest_id
                exp.save()

        super().save(*args, **kwargs)
        
        from quest_search.tasks import embed_and_store_quest
        exps = [{ 'exp_title': e.exp_title, 'exp_description': e.exp_description, 'exp_type': e.exp_type } for e in exps]
        
        embed_and_store_quest(self.quest_id, self.quest_title, self.quest_description, exps)

        
        
        
        
