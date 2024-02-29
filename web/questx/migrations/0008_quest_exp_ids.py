# Generated by Django 4.0 on 2024-02-29 11:03

from django.db import migrations, models
import questx.models


class Migration(migrations.Migration):

    dependencies = [
        ('questx', '0007_remove_experience_exp_duration_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='quest',
            name='exp_ids',
            field=models.JSONField(default=list, help_text=(('E96463347', 'Lost Temple Expedition'), ('E63901253', 'Survival Camp in the Wilderness'), ('E04879137', 'Nightlife Adventure in the City')), validators=[questx.models.ExperienceValidator()]),
        ),
    ]
