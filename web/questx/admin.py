from django.contrib import admin

# Register your models here.
from .models import Quest, Experience, ManagerProfile, MemberProfile


admin.site.register(Quest)
admin.site.register(Experience)
admin.site.register(ManagerProfile)
admin.site.register(MemberProfile)