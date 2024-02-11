# Generated by Django 4.0 on 2024-02-10 20:14

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CommunityManager',
            fields=[
                ('cm_id', models.CharField(default='C64877711', editable=False, max_length=9, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('email', models.EmailField(max_length=254, validators=[django.core.validators.EmailValidator()])),
                ('password', models.CharField(max_length=20, validators=[django.core.validators.MinLengthValidator(8, 'password should be minimum of 8 charectors')])),
                ('joined_on', models.DateTimeField(verbose_name='Join date')),
                ('location', models.CharField(max_length=512)),
                ('organization', models.CharField(max_length=512)),
            ],
        ),
        migrations.CreateModel(
            name='Experience',
            fields=[
                ('exp_id', models.CharField(default='E47729750', editable=False, max_length=9, primary_key=True, serialize=False)),
                ('agent_name', models.CharField(max_length=200)),
                ('agent_location', models.CharField(max_length=512)),
                ('agent_phone', models.CharField(max_length=15, validators=[django.core.validators.RegexValidator(code='invalid_phone_number', message='Phone number must be in the format +81XXXXXXXXXX or 0XXXXXXXXXX', regex='^(\\+?81|0)-?(\\d{1,4})-?(\\d{1,4})-?(\\d{4})$')])),
                ('exp_type', models.CharField(choices=[('task', 'Task'), ('activity', 'Activity/Event')], max_length=10)),
                ('exp_title', models.CharField(max_length=200)),
                ('exp_description', models.CharField(max_length=512, validators=[django.core.validators.MinLengthValidator(50, 'Please describe your task in atleast 50 characters')])),
                ('exp_duration', models.PositiveIntegerField()),
                ('exp_preferred_time', models.CharField(choices=[('night', 'Night'), ('day', 'Day')], default='day', max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('user_id', models.CharField(default='U22183302', editable=False, max_length=9, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('email', models.EmailField(max_length=254, validators=[django.core.validators.EmailValidator()])),
                ('password', models.CharField(max_length=20, validators=[django.core.validators.MinLengthValidator(8, 'password should be minimum of 8 charectors')])),
                ('date_of_birth', models.DateField(verbose_name='Date of birth')),
                ('joined_on', models.DateTimeField(verbose_name='Join date')),
                ('user_phone', models.CharField(max_length=15, validators=[django.core.validators.RegexValidator(code='invalid_phone_number', message='Phone number must be in the format +81XXXXXXXXXX or 0XXXXXXXXXX', regex='^(\\+?81|0)-?(\\d{1,4})-?(\\d{1,4})-?(\\d{4})$')])),
            ],
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('place_of_birth', models.CharField(max_length=512)),
                ('place_of_residence', models.CharField(max_length=512)),
                ('members_details', models.JSONField(default=list)),
                ('field of specialization', models.JSONField(default=list)),
                ('hobby', models.JSONField(default=list)),
                ('notices', models.JSONField(default=list)),
                ('expectations', models.CharField(max_length=512)),
                ('concern', models.CharField(max_length=512)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='questx.user')),
            ],
        ),
        migrations.CreateModel(
            name='Quest',
            fields=[
                ('quest_id', models.CharField(default='Q55176057', editable=False, max_length=9, primary_key=True, serialize=False)),
                ('quest_title', models.CharField(max_length=200)),
                ('quest_description', models.CharField(max_length=512, validators=[django.core.validators.MinLengthValidator(20, 'Description should be minimum 20 characters')])),
                ('quest_duration', models.PositiveIntegerField()),
                ('quest_tags', models.JSONField(default=list)),
                ('community_manager', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='questx.communitymanager')),
                ('quest_exps', models.ManyToManyField(blank=True, to='questx.Experience')),
            ],
        ),
    ]