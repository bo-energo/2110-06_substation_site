from dis import pretty_flags
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


class AssetStatus(models.Model):
    id = models.BigAutoField(primary_key=True)
    inspection = models.ForeignKey('Inspections', models.DO_NOTHING, db_column='inspection', verbose_name='Осмотр')
    level = models.ForeignKey('Levels', models.DO_NOTHING, db_column='level', verbose_name='Критичность')

    class Meta:
        managed = False
        db_table = 'asset_status'
        verbose_name_plural = 'Статус объектов'
        verbose_name = 'Статус объекта'
        
    def __str__(self):
        return str(self.id)


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

    def __str__(self):
        return str(self.name)


class Assets(models.Model):
    id = models.IntegerField(primary_key=True)
    guid = models.CharField(max_length=150, blank=True, null=True, verbose_name='GUID')
    type = models.ForeignKey(AssetType, models.DO_NOTHING, verbose_name='Тип оборудования')
    name = models.CharField(max_length=150, blank=True, null=True, verbose_name='Название')


    class Meta:
        managed = False
        db_table = 'assets'
        verbose_name = 'Оборудования'
        verbose_name_plural = 'Оборудование'

    def __str__(self):
        return str(self.name)


class Constants(models.Model):
    #id = models.IntegerField(primary_key=True)
    asset = models.ForeignKey(Assets, models.DO_NOTHING, verbose_name='Объект')
    param = models.ForeignKey('Params', models.DO_NOTHING, verbose_name='Параметр')
    value = models.FloatField(blank=True, null=True, verbose_name='Значение')

    class Meta:
        managed = False
        db_table = 'constants'
        verbose_name_plural = 'Константы'
        verbose_name = 'Константа'

    def __str__(self):
        return str(self.param)


class Inspections(models.Model):
    #id = models.BigAutoField(primary_key=True)
    date = models.DateTimeField(verbose_name='Дата')
    asset = models.ForeignKey(Assets, models.DO_NOTHING, verbose_name='Объект')

    def __str__(self):
        return str(self.id)  + ': ' + str(self.date)

    class Meta:
        managed = False
        db_table = 'inspections'
        verbose_name_plural = 'Замеры'
        verbose_name = 'Замер'


class Levels(models.Model):
    id = models.IntegerField(primary_key=True, verbose_name='Id')
    name = models.CharField(max_length=150, verbose_name='Наименование')

    class Meta:
        managed = False
        db_table = 'levels'
        verbose_name_plural = 'Уровни критичности'
        verbose_name = 'Уровень критичности'

    def __str__(self):
        return str(self.name)


class MeasurmentsBush(models.Model):
    #id = models.BigAutoField(primary_key=True)
    inspection = models.ForeignKey(Inspections, models.DO_NOTHING)
    c1_a = models.FloatField(blank=True, null=True)
    c1_b = models.FloatField(blank=True, null=True)
    c1_c = models.FloatField(blank=True, null=True)
    d_c1_a = models.FloatField(blank=True, null=True)
    d_c1_b = models.FloatField(blank=True, null=True)
    d_c1_c = models.FloatField(blank=True, null=True)
    tgd_a = models.FloatField(blank=True, null=True)
    tgd_b = models.FloatField(blank=True, null=True)
    tgd_c = models.FloatField(blank=True, null=True)
    d_tgd_a = models.FloatField(blank=True, null=True)
    d_tgd_b = models.FloatField(blank=True, null=True)
    d_tgd_c = models.FloatField(blank=True, null=True)

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


class MeasurmentsC(models.Model):
    #id = models.BigAutoField(primary_key=True)
    inspection = models.ForeignKey('Inspections', models.DO_NOTHING)
    c_h2 = models.FloatField(blank=True, null=True)
    c_co = models.FloatField(blank=True, null=True)
    c_co2 = models.FloatField(blank=True, null=True)
    c_c2h2 = models.FloatField(blank=True, null=True)
    c_c2h4 = models.FloatField(blank=True, null=True)
    c_c2h6 = models.FloatField(blank=True, null=True)
    c_ch4 = models.FloatField(blank=True, null=True)
    c_h2_roc_7 = models.FloatField(blank=True, null=True)
    c_co_roc_7 = models.FloatField(blank=True, null=True)
    c_co2_roc_7 = models.FloatField(blank=True, null=True)
    c_c2h2_roc_7 = models.FloatField(blank=True, null=True)
    c_c2h4_roc_7 = models.FloatField(blank=True, null=True)
    c_c2h6_roc_7 = models.FloatField(blank=True, null=True)
    c_ch4_roc_7 = models.FloatField(blank=True, null=True)
    c_h2_roc_30 = models.FloatField(blank=True, null=True)
    c_co_roc_30 = models.FloatField(blank=True, null=True)
    c_co2_roc_30 = models.FloatField(blank=True, null=True)
    c_c2h2_roc_30 = models.FloatField(blank=True, null=True)
    c_c2h4_roc_30 = models.FloatField(blank=True, null=True)
    c_c2h6_roc_30 = models.FloatField(blank=True, null=True)
    c_ch4_roc_30 = models.FloatField(blank=True, null=True)
    c_tg = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'measurments_c'
        verbose_name_plural = 'Замеры концентраций'
        verbose_name = 'Замер'


class MeasurmentsBush(models.Model):
    id = models.BigAutoField(primary_key=True)
    inspection = models.ForeignKey(Inspections, models.DO_NOTHING)
    c1_a = models.FloatField(blank=True, null=True)
    c1_b = models.FloatField(blank=True, null=True)
    c1_c = models.FloatField(blank=True, null=True)
    d_c1_a = models.FloatField(blank=True, null=True)
    d_c1_b = models.FloatField(blank=True, null=True)
    d_c1_c = models.FloatField(blank=True, null=True)
    tgd_a = models.FloatField(blank=True, null=True)
    tgd_b = models.FloatField(blank=True, null=True)
    tgd_c = models.FloatField(blank=True, null=True)
    d_tgd_a = models.FloatField(blank=True, null=True)
    d_tgd_b = models.FloatField(blank=True, null=True)
    d_tgd_c = models.FloatField(blank=True, null=True)
    t_a = models.FloatField(blank=True, null=True)
    t_b = models.FloatField(blank=True, null=True)
    t_c = models.FloatField(blank=True, null=True)
    pd_bush_level = models.FloatField(blank=True, null=True)
    pd_bush_intensity = models.FloatField(blank=True, null=True)
    bush_i_creepage = models.FloatField(blank=True, null=True)
    bush_pres = models.FloatField(blank=True, null=True)
    bush_overvoltage_duration = models.FloatField(blank=True, null=True)
    bush_overvoltage_amplitude = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'measurments_bush'


class MeasurmentsBushO(models.Model):
    id = models.BigAutoField(primary_key=True)
    measurment_bush = models.ForeignKey(MeasurmentsBush, models.DO_NOTHING, blank=True, null=True)
    order = models.IntegerField(blank=True, null=True)
    measure = models.IntegerField(blank=True, null=True)
    value = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'measurments_bush_o'


class MeasurmentsCooling(models.Model):
    id = models.BigAutoField(primary_key=True)
    inspection = models.ForeignKey(Inspections, models.DO_NOTHING, blank=True, null=True)
    order = models.IntegerField(blank=True, null=True)
    cooling_t_in = models.FloatField(blank=True, null=True)
    cooling_t_out = models.FloatField(blank=True, null=True)
    cooling_pump_on = models.FloatField(blank=True, null=True)
    cooling_fan_on = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'measurments_cooling'


class MeasurmentsD(models.Model):
    id = models.BigAutoField(primary_key=True)
    inspection = models.ForeignKey(Inspections, models.DO_NOTHING, blank=True, null=True)
    order = models.IntegerField(blank=True, null=True)
    pd_level = models.FloatField(blank=True, null=True)
    pd_intensity = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'measurments_d'


class MeasurmentsLtc(models.Model):
    id = models.BigAutoField(primary_key=True)
    inspection = models.ForeignKey(Inspections, models.DO_NOTHING, blank=True, null=True)
    ltc_pos = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'measurments_ltc'


class MeasurmentsMoisture(models.Model):
    id = models.BigAutoField(primary_key=True)
    inspection = models.ForeignKey(Inspections, models.DO_NOTHING)
    rs = models.FloatField(blank=True, null=True)
    wcl = models.FloatField(blank=True, null=True)
    wcl_roc_day = models.FloatField(blank=True, null=True)
    wcl_roc_month = models.FloatField(blank=True, null=True)
    wcl_tp = models.FloatField(blank=True, null=True)
    wcp = models.FloatField(blank=True, null=True)
    wcp_roc_dayf = models.FloatField(blank=True, null=True)
    wcp_roc_month = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'measurments_moisture'


class MeasurmentsO(models.Model):
    id = models.BigAutoField(primary_key=True)
    inspection = models.ForeignKey(Inspections, models.DO_NOTHING, blank=True, null=True)
    code = models.CharField(max_length=250, blank=True, null=True)
    overvoltage_duration = models.IntegerField(blank=True, null=True)
    overvoltage_ratio = models.FloatField(blank=True, null=True)
    overvoltage_counter_01 = models.BooleanField(blank=True, null=True)
    overvoltage_counter_02 = models.BooleanField(blank=True, null=True)
    overvoltage_counter_03 = models.BooleanField(blank=True, null=True)
    overvoltage_counter_04 = models.BooleanField(blank=True, null=True)
    overvoltage_counter_05 = models.BooleanField(blank=True, null=True)
    overvoltage_counter_06 = models.BooleanField(blank=True, null=True)
    overvoltage_counter_07 = models.BooleanField(blank=True, null=True)
    overvoltage_counter_08 = models.BooleanField(blank=True, null=True)
    overvoltage_counter_09 = models.BooleanField(blank=True, null=True)
    overvoltage_counter_flag = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'measurments_o'


class MeasurmentsOil(models.Model):
    id = models.BigAutoField(primary_key=True)
    inspection = models.ForeignKey(Inspections, models.DO_NOTHING, blank=True, null=True)
    rs = models.FloatField(blank=True, null=True)
    data_oil_drying = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'measurments_oil'


class MeasurmentsPattern(models.Model):
    id = models.BigAutoField(primary_key=True)
    measurment_d = models.ForeignKey(MeasurmentsD, models.DO_NOTHING, blank=True, null=True)
    measurment_bush = models.ForeignKey(MeasurmentsBush, models.DO_NOTHING, blank=True, null=True)
    phaze = models.IntegerField(blank=True, null=True)
    amplitude = models.IntegerField(blank=True, null=True)
    frequency = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'measurments_pattern'


class Params(models.Model):
    #id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=150, verbose_name='Наименование')
    description = models.CharField(max_length=450, blank=True, null=True, verbose_name='Комментарий')
    type = models.ForeignKey('Types', models.DO_NOTHING, verbose_name='Тип')

    class Meta:
        managed = False
        db_table = 'params'
        verbose_name_plural = 'Параметры'
        verbose_name = 'Параметр'

    def __str__(self):
        return str(self.name)


class Pdata(models.Model):
    #id = models.IntegerField(primary_key=True)
    asset_id = models.IntegerField(verbose_name='Объект')
    param = models.ForeignKey(Params, models.DO_NOTHING, verbose_name='Параметр')
    value = models.FloatField(blank=True, null=True, verbose_name='Значение')
    norm_ref = models.ForeignKey('PdataNorms', models.DO_NOTHING, db_column='norm_ref', blank=True, null=True, verbose_name='Значение из списка')

    class Meta:
        managed = False
        db_table = 'pdata'
        verbose_name_plural = 'Паспортные данные'
        verbose_name = 'Параметр'

    def __str__(self):
        return str(self.param)


class PdataNorms(models.Model):
    #id = models.IntegerField(primary_key=True)
    type = models.ForeignKey('Types', models.DO_NOTHING, verbose_name='Тип')
    name = models.CharField(max_length=150, verbose_name='Наименование')

    class Meta:
        managed = False
        db_table = 'pdata_norms'
        verbose_name_plural = 'Перечисления значений паспортных данных'
        verbose_name = 'Перечисления значений паспортных данных'

    def __str__(self):
        return str(self.name)


class PdataSpec(models.Model):
   # id = models.IntegerField(primary_key=True)
    pdata = models.ForeignKey(Pdata, models.DO_NOTHING, verbose_name='Данные из паспорта')
    order = models.IntegerField(verbose_name='Order')
    value = models.FloatField(blank=True, null=True, verbose_name='Значение')

    class Meta:
        managed = False
        db_table = 'pdata_spec'

    def __str__(self):
        return str(self.pdata)


class Properties(models.Model):
    id = models.IntegerField(primary_key=True)
    property = models.CharField(max_length=150)
    name = models.CharField(max_length=150, blank=True, null=True)
    unit = models.ForeignKey('Units', models.DO_NOTHING, db_column='unit', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'properties'


class Types(models.Model):
    #id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=150, verbose_name='Наименование')

    class Meta:
        managed = False
        db_table = 'types'
        verbose_name = 'Типы данных'
        verbose_name_plural = 'Тип данных'

    def __str__(self):
        return str(self.name)


class CalcResultsGis(models.Model):
    id = models.BigAutoField(primary_key=True)
    inspection = models.ForeignKey('Inspections', models.DO_NOTHING, blank=True, null=True)
    p_diff = models.FloatField(blank=True, null=True)
    breaker_mechanical_wear = models.FloatField(blank=True, null=True)
    breaker_electrical_wear = models.FloatField(blank=True, null=True)
    booster_pump_rul = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'calc_results_gis'
        verbose_name_plural = 'Результат диагностики по Gis'
        verbose_name = 'Результат диагностики по Gis'


class CalcResultsGisDiag(models.Model):
    id = models.BigAutoField(primary_key=True)
    inspection = models.ForeignKey('Inspections', models.DO_NOTHING, blank=True, null=True)
    asset = models.ForeignKey('Assets', models.DO_NOTHING, blank=True, null=True)
    code = models.CharField(max_length=1000, blank=True, null=True)
    value = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'calc_results_gis_diag'
        verbose_name_plural = 'Результат диагностики по Gis (диагн. заключения)'
        verbose_name = 'Диагностическое заключение'


class CalcResultsGisSpec(models.Model):
    id = models.BigAutoField(primary_key=True)
    calc_results = models.ForeignKey(CalcResultsGis, models.DO_NOTHING, blank=True, null=True)
    code = models.CharField(max_length=1000, blank=True, null=True)
    value = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'calc_results_gis_spec'
        verbose_name_plural = 'Результат диагностики по Gis (спец параметры)'
        verbose_name = 'Специальный параметр'


class CalcResultsTransf(models.Model):
    id = models.BigAutoField(primary_key=True)
    inspection = models.ForeignKey('Inspections', models.DO_NOTHING, blank=True, null=True)
    coeff_load = models.FloatField(blank=True, null=True)
    t_hst_ttr = models.FloatField(blank=True, null=True)
    rs = models.FloatField(blank=True, null=True)
    wcp = models.FloatField(blank=True, null=True)
    ltc_mechanical_wear = models.FloatField(blank=True, null=True)
    ltc_electrical_wear = models.FloatField(blank=True, null=True)
    t_ltc_diff = models.FloatField(blank=True, null=True)
    s_loss_noload = models.CharField(max_length=1000, blank=True, null=True)
    s_loss_shortcircuit = models.CharField(max_length=1000, blank=True, null=True)
    k_overload_coeff_alarm = models.CharField(max_length=1000, blank=True, null=True)
    k_overload_coeff_long = models.CharField(max_length=1000, blank=True, null=True)
    duration_coeff_long = models.CharField(max_length=1000, blank=True, null=True)
    duration_overload = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'calc_results_transf'
        verbose_name_plural = 'Результат диагностики по трансформаторам'
        verbose_name = 'Результат диагностики по трансформаторам'


class CalcResultsTransfDiag(models.Model):
    id = models.BigAutoField(primary_key=True)
    inspection = models.ForeignKey('Inspections', models.DO_NOTHING, blank=True, null=True)
    code = models.CharField(max_length=1000, blank=True, null=True)
    value = models.CharField(max_length=1000, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'calc_results_transf_diag'
        verbose_name_plural = 'Результат диагностики по трансфторматорам (диагн. заключения)'
        verbose_name = 'Диагностическое заключение'


class CalcResultsTransfSpec(models.Model):
    id = models.BigAutoField(primary_key=True)
    calc_results = models.ForeignKey(CalcResultsTransf, models.DO_NOTHING, blank=True, null=True)
    code = models.CharField(max_length=1000, blank=True, null=True)
    value = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'calc_results_transf_spec'
        verbose_name_plural = 'Результат диагностики по трансфторам (спец параметры)'
        verbose_name = 'Специальный параметр'


class Units(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=150, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'units'

