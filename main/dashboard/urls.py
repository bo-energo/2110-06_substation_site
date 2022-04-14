from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name='home'),
    path('transofrmList', transofrmList, name='transofrmList'),
    path('diagnostics', diagnostics, name='diagnostics')
]