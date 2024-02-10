from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("api/", include("questx.urls")),
    path("admin/", admin.site.urls),
]

admin.site.site_title = "QuestX"
admin.site.site_header = "QuestX Admin"
admin.site.index_title = "QuestX"