from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'', views.SlideshowViewSet)
router.register(r'slides', views.SlideViewSet)

urlpatterns = [
    path('', include(router.urls)),
]