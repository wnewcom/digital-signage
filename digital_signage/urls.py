from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('core.urls')),
    path('api/v1/display/', include('displays.urls')),
    path('api/v1/slideshow/', include('slideshows.urls')),
    path('api/v1/widgets/', include('widgets.urls')),
    path('', TemplateView.as_view(template_name='index.html'), name='home'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# Catch-all pattern for Vue.js routing
urlpatterns += [
    path('<path:path>', TemplateView.as_view(template_name='index.html')),
]