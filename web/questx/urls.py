from rest_framework import routers
from .api import ExperienceViewset, QuestViewset, ManagerProfileViewset, MemberProfileViewset


router = routers.DefaultRouter()
router.register('experience', ExperienceViewset, 'experiences')
router.register('quest', QuestViewset, 'quests')
router.register('member', MemberProfileViewset, 'members')
router.register('cm', ManagerProfileViewset, 'managers')

urlpatterns = router.urls