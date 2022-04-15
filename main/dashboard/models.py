from django.db import models

# Create your models here.
# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AssetType(models.Model):
    # id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=150, verbose_name='Наименование')

    def __str__(self):
        return self.name

    class Meta:
        managed = False
        db_table = 'asset_type'
        verbose_name = 'Тип оборудования'
        verbose_name_plural = 'Тип оборудований'


class Assets(models.Model):
    # id = models.IntegerField(primary_key=True)
    guid = models.CharField(max_length=150, blank=True, null=True, verbose_name='GUID')
    type = models.ForeignKey(AssetType, models.DO_NOTHING, verbose_name='Тип оборудования')

    def __str__(self):
        return self.guid

    class Meta:
        managed = False
        db_table = 'assets'
        verbose_name = 'Оборудования'
        verbose_name_plural = 'Оборудование'


class Constants(models.Model):
    #id = models.IntegerField(primary_key=True)
    asset = models.ForeignKey(Assets, models.DO_NOTHING)
    param = models.ForeignKey('Params', models.DO_NOTHING)
    value = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'constants'
        verbose_name_plural = 'Константы'
        verbose_name = 'Константа'


class Inspections(models.Model):
    #id = models.BigAutoField(primary_key=True)
    date = models.DateTimeField()
    asset = models.ForeignKey(Assets, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'inspections'
        verbose_name_plural = 'Замеры'
        verbose_name = 'Замер'


class MeasurmentsBush(models.Model):
    #id = models.BigAutoField(primary_key=True)
    inspection = models.ForeignKey(Inspections, models.DO_NOTHING)
    c1_a = models.FloatField(blank=True, null=True)
    c1_b = models.FloatField(blank=True, null=True)
    c1_c = models.FloatField(blank=True, null=True)
    d_c1_a = models.FloatField(blank=True, null=True)
    d_c1_b = models.FloatField(blank=True, null=True)
    d_c1_c = models.FloatField(blank=True, null=True)
    tgd_1 = models.FloatField(blank=True, null=True)
    tgd_2 = models.FloatField(blank=True, null=True)
    tgd_3 = models.FloatField(blank=True, null=True)
    d_tgd_1 = models.FloatField(blank=True, null=True)
    d_tgd_2 = models.FloatField(blank=True, null=True)
    d_tgd_3 = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'measurments_bush'
        verbose_name_plural = 'Замеры пузырьков'
        verbose_name = 'Замер'


class MeasurmentsI(models.Model):
    #id = models.BigAutoField(primary_key=True)
    inspection = models.ForeignKey(Inspections, models.DO_NOTHING)
    u_hv_a = models.FloatField(blank=True, null=True)
    u_hv_b = models.FloatField(blank=True, null=True)
    u_hv_c = models.FloatField(blank=True, null=True)
    u_mv_a = models.FloatField(blank=True, null=True)
    u_mv_b = models.FloatField(blank=True, null=True)
    u_mv_c = models.FloatField(blank=True, null=True)
    u_lv_a = models.FloatField(blank=True, null=True)
    u_lv_b = models.FloatField(blank=True, null=True)
    u_lv_c = models.FloatField(blank=True, null=True)
    u_lin_hv_a = models.FloatField(blank=True, null=True)
    u_lin_hv_b = models.FloatField(blank=True, null=True)
    u_lin_hv_c = models.FloatField(blank=True, null=True)
    u_lin_mv_a = models.FloatField(blank=True, null=True)
    u_lin_mv_b = models.FloatField(blank=True, null=True)
    u_lin_mv_c = models.FloatField(blank=True, null=True)
    u_lin_lv_a = models.FloatField(blank=True, null=True)
    u_lin_lv_b = models.FloatField(blank=True, null=True)
    u_lin_lv_c = models.FloatField(blank=True, null=True)
    i_hv_a = models.FloatField(blank=True, null=True)
    i_hv_b = models.FloatField(blank=True, null=True)
    i_hv_c = models.FloatField(blank=True, null=True)
    i_mv_a = models.FloatField(blank=True, null=True)
    i_mv_b = models.FloatField(blank=True, null=True)
    i_mv_c = models.FloatField(blank=True, null=True)
    i_pa_hv = models.FloatField(blank=True, null=True)
    i_pb_hv = models.FloatField(blank=True, null=True)
    i_pc_hv = models.FloatField(blank=True, null=True)
    p_hv = models.FloatField(blank=True, null=True)
    p_mv = models.FloatField(blank=True, null=True)
    p_lv = models.FloatField(blank=True, null=True)
    q_hv = models.FloatField(blank=True, null=True)
    q_mv = models.FloatField(blank=True, null=True)
    q_lv = models.FloatField(blank=True, null=True)
    s_hv = models.FloatField(blank=True, null=True)
    s_mv = models.FloatField(blank=True, null=True)
    s_lv = models.FloatField(blank=True, null=True)
    s_loss_noload = models.FloatField(blank=True, null=True)
    s_loss_shortcircuit = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'measurments_i'
        verbose_name_plural = 'Замеры рабочих параметров'
        verbose_name = 'Замер'


class MeasurmentsT(models.Model):
    #id = models.BigAutoField(primary_key=True)
    inspection = models.ForeignKey(Inspections, models.DO_NOTHING)
    t_bl = models.FloatField(blank=True, null=True)
    t_bl_gap = models.FloatField(blank=True, null=True)
    t_bt = models.FloatField(blank=True, null=True)
    t_bt_off = models.FloatField(blank=True, null=True)
    t_en = models.FloatField(blank=True, null=True)
    t_hst = models.FloatField(blank=True, null=True)
    t_hst_ttr = models.FloatField(blank=True, null=True)
    t_ltc = models.FloatField(blank=True, null=True)
    t_ltc_diff = models.FloatField(blank=True, null=True)
    t_tp = models.FloatField(blank=True, null=True)
    t_tp_calc = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'measurments_t'
        verbose_name_plural = 'Замеры температур'
        verbose_name = 'Замер'


class Params(models.Model):
    #id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=150)
    description = models.CharField(max_length=450, blank=True, null=True)
    type = models.ForeignKey('Types', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'params'
        verbose_name_plural = 'Параметры'
        verbose_name = 'Параметр'


class Pdata(models.Model):
    #id = models.IntegerField(primary_key=True)
    asset_id = models.IntegerField()
    param = models.ForeignKey(Params, models.DO_NOTHING)
    value = models.FloatField(blank=True, null=True)
    norm_ref = models.ForeignKey('PdataNorms', models.DO_NOTHING, db_column='norm_ref', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pdata'
        verbose_name_plural = 'Паспортные данные'
        verbose_name = 'Параметр'


class PdataNorms(models.Model):
    #id = models.IntegerField(primary_key=True)
    type = models.ForeignKey('Types', models.DO_NOTHING)
    name = models.CharField(max_length=150)

    class Meta:
        managed = False
        db_table = 'pdata_norms'


class PdataSpec(models.Model):
   # id = models.IntegerField(primary_key=True)
    pdata = models.ForeignKey(Pdata, models.DO_NOTHING)
    order = models.IntegerField()
    value = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pdata_spec'


class Types(models.Model):
    #id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=150)

    class Meta:
        managed = False
        db_table = 'types'
        verbose_name = 'Типы данных'
        verbose_name_plural = 'Тип данных'
