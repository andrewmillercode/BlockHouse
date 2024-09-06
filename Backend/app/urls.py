from django.contrib import admin
from django.urls import path

from .views import returnChartJsonData

urlpatterns =[
    path('api/<str:chartType>/',returnChartJsonData,name='getChartJsonData')

]

