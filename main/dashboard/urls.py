from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name='home'),
    path('diagnostics', diagnostics, name='diagnostics')
]