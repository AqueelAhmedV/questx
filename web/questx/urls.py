from rest_framework import routers
from .api import ExperienceViewset


router = routers.DefaultRouter()
router.register('experience', ExperienceViewset, 'experiences')

urlpatterns = router.urls