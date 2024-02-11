from django.contrib import admin

# Register your models here.
from .models import Quest, Experience, User, CommunityManager


admin.site.register(User)
admin.site.register(CommunityManager)
admin.site.register(Quest)
admin.site.register(Experience)