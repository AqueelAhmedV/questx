# Generated by Django 4.0 on 2024-02-28 08:55

from django.db import migrations, models
import questx.models


class Migration(migrations.Migration):

    dependencies = [
        ('questx', '0002_quest_exps_choices'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quest',
            name='exps_choices',
            field=models.JSONField(blank=True, default=questx.models.get_exp_choices),
        ),
    ]
