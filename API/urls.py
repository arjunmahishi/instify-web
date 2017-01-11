from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^university-news/', views.univNews),
	url(r'^attendance/', views.attendance),
	url(r'^time-table/', views.timeTable),
]
