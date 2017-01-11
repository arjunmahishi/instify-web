from django.conf.urls import url, include
from django.contrib import admin
from adminPanel import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.landing),
    url(r'^polls/', include('API.urls'))
]
