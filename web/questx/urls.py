from rest_framework import routers
from .api import ExperienceViewset, UserViewset


router = routers.DefaultRouter()
router.register('experience', ExperienceViewset, 'experiences')
router.register('user', UserViewset, 'users')

urlpatterns = router.urls