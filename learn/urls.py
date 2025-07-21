from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('app.urls')),
    # ...other patterns...
]

# Custom error handlers
handler404 = 'app.views.custom_404_view'

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += [
        path('test-404/', lambda request: exec('raise Exception()'), name='test_404'),
    ]
