from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from .views import TaskView

router = routers.DefaultRouter()
router.register(r'tasks', TaskView, 'tasks')

urlpatterns = [
    path("apiv1/", include(router.urls)),
    path("docs/", include_docs_urls(title="TASK API"))
]