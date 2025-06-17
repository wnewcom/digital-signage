from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/display/(?P<display_id>\w+)/$', consumers.DisplayConsumer.as_asgi()),
    re_path(r'ws/admin/$', consumers.AdminConsumer.as_asgi()),
]