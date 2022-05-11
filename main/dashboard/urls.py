from django.urls import path
from .views import *

urlpatterns = [
    # main page
    path('', index, name='home'),
    path('assets/', allAssets, name='allAssets'),
    path('levels/', allLevel, name='allLevel'),
    # path('transofrmList', transofrmList, name='transofrmList'),

    # info transformators
    path('asset/<str:name>', selectTransform, name='selectTransform'),
    path('asset/<str:name>/updateArchive', updateArchive, name='updateArchive')
]