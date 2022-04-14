from csv import list_dialects
from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import Assets, AssetType


class AssetsTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_display_links = ('id', 'name')
    search_fields = ('name',)


class AssetsAdmin(admin.ModelAdmin):
    list_display = ('id', 'guid', 'type')
    list_display_links = ('id', 'guid', 'type')
    search_fields = ('name',)


admin.site.register(AssetType, AssetsTypeAdmin)
admin.site.register(Assets, AssetsAdmin)

admin.site.site_header = 'Администрирование'