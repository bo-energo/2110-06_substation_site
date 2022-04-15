from csv import list_dialects
from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import *


class AssetsTypeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_display_links = ('id', 'name')
    search_fields = ('name',)


class AssetsAdmin(admin.ModelAdmin):
    list_display = ('id', 'guid', 'type')
    list_display_links = ('id', 'guid', 'type')
    search_fields = ('name',)


class ConstantsAdmin(admin.ModelAdmin):
    list_display = ('id', 'asset', 'param','value')
    list_display_links = ('id', 'asset', 'param','value')
    search_fields = ('asset',)


class InspectionsAdmin(admin.ModelAdmin):
    list_display = ('id', 'date', 'asset')
    list_display_links = ('id', 'date', 'asset')
    search_fields = ('date',)


class MeasurmentsBushAdmin(admin.ModelAdmin):
    list_display = ('id', 'inspection', 'c1_a', 'c1_b', 'c1_c', 'd_c1_a', 'd_c1_b', 'd_c1_c', 'tgd_1', 'tgd_2', 'tgd_3', 'd_tgd_1', 'd_tgd_2', 'd_tgd_3')
    list_display_links = ('id', 'inspection', 'c1_a', 'c1_b', 'c1_c', 'd_c1_a', 'd_c1_b', 'd_c1_c', 'tgd_1', 'tgd_2', 'tgd_3', 'd_tgd_1', 'd_tgd_2', 'd_tgd_3')
    search_fields = ('inspection',)


class MeasurmentsIAdmin(admin.ModelAdmin):
    list_display = ('id', 'inspection', 'u_hv_a', 'u_hv_b', 'u_hv_c', 'u_mv_a', 'u_mv_b', 'u_mv_c', 'u_lv_a', 'u_lv_b', 'u_lv_c', 'u_lin_hv_a', 'u_lin_hv_b', 'u_lin_hv_c', 'u_lin_mv_a', 'u_lin_mv_b', 'u_lin_mv_c', 'u_lin_lv_a', 'u_lin_lv_b','u_lin_lv_c',
        'i_hv_a', 'i_hv_b', 'i_hv_c', 'i_mv_a', 'i_mv_b', 'i_mv_c', 'i_pa_hv', 'i_pb_hv', 'i_pc_hv', 'p_hv', 'p_mv', 'p_lv', 'q_hv', 'q_mv', 'q_lv', 's_hv', 's_mv', 's_lv', 's_loss_noload', 's_loss_shortcircuit')
    list_display_links = ('id', 'inspection', 'u_hv_a', 'u_hv_b', 'u_hv_c', 'u_mv_a', 'u_mv_b', 'u_mv_c', 'u_lv_a', 'u_lv_b', 'u_lv_c', 'u_lin_hv_a', 'u_lin_hv_b', 'u_lin_hv_c', 'u_lin_mv_a', 'u_lin_mv_b', 'u_lin_mv_c', 'u_lin_lv_a', 'u_lin_lv_b','u_lin_lv_c',
        'i_hv_a', 'i_hv_b', 'i_hv_c', 'i_mv_a', 'i_mv_b', 'i_mv_c', 'i_pa_hv', 'i_pb_hv', 'i_pc_hv', 'p_hv', 'p_mv', 'p_lv', 'q_hv', 'q_mv', 'q_lv', 's_hv', 's_mv', 's_lv', 's_loss_noload', 's_loss_shortcircuit')
    search_fields = ('inspection',)


class MeasurmentsTAdmin(admin.ModelAdmin):
    list_display = ('id', 'inspection', 't_bl', 't_bl_gap', 't_bt', 't_bt_off', 't_en', 't_hst', 't_hst_ttr', 't_ltc', 't_ltc_diff', 't_tp', 't_tp_calc')
    list_display_links = ('id', 'inspection', 't_bl', 't_bl_gap', 't_bt', 't_bt_off', 't_en', 't_hst', 't_hst_ttr', 't_ltc', 't_ltc_diff', 't_tp', 't_tp_calc')
    search_fields = ('inspection',)


class ParamsAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'type')
    list_display_links = ('id', 'name', 'description', 'type')
    search_fields = ('name',)


class PdataAdmin(admin.ModelAdmin):
    list_display = ('id', 'asset_id', 'value', 'norm_ref')
    list_display_links = ('id', 'asset_id', 'value', 'norm_ref')
    search_fields = ('asset_id',)


class PdataNormsAdmin(admin.ModelAdmin):
    list_display = ('id', 'type', 'name')
    list_display_links =  ('id', 'type', 'name')
    search_fields = ('type',)


class PdataSpecAdmin(admin.ModelAdmin):
    list_display = ('id', 'pdata', 'order', 'value')
    list_display_links =  ('id', 'pdata', 'order', 'value')
    search_fields = ('pdata',)


class TypesAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    list_display_links =  ('id', 'name')
    search_fields = ('name',)



admin.site.register(AssetType, AssetsTypeAdmin)
admin.site.register(Assets, AssetsAdmin)
admin.site.register(Constants, ConstantsAdmin)
admin.site.register(Inspections, InspectionsAdmin)
admin.site.register(MeasurmentsBush, MeasurmentsBushAdmin)
admin.site.register(MeasurmentsI, MeasurmentsIAdmin)
admin.site.register(MeasurmentsT, MeasurmentsTAdmin)
admin.site.register(Params, ParamsAdmin)
admin.site.register(Pdata, PdataAdmin)
admin.site.register(PdataNorms, PdataNormsAdmin)
admin.site.register(PdataSpec, PdataSpecAdmin)
admin.site.register(Types, TypesAdmin)

admin.site.site_header = 'Администрирование'