import asyncio
from dashboard.models import *
from dashboard.data.Abstract.ATabsAsset import ATabsAsset
from asgiref.sync import sync_to_async

from threading import Thread


class transformator(ATabsAsset):    
          

    def Multiprocessing(self):
        
        funcs = [
            self.tabOvervoltage,
            self.tabPower,
            self.tabTemps,
            self.tabMoisture,
            self.tabInsulationWear,
            self.tabCoolingStatus,
            self.tabStateRPN,
            self.tabStateInputs,
            self.tabInternalLosses,
            self.tabChr,
            self.tabLoadedCapacity,
            self.tabState,
            self.tabGases,
        ]

        results = dict()
        threads = [None] * len(funcs)

        for i in range(len(funcs)):
            threads[i] = Thread(target=funcs[i], args=(results,))
            threads[i].start()

        for i in range(len(threads)):
            threads[i].join()

        return results

    def GetData(self):
        """Формирование данных для вкладок"""

        values = self.Multiprocessing()
        
        result = {
            'tabsData':[
                {
                    'title' : 'Перенапряжения',
                    'values' : values['Overvoltage']
                },    
                {
                    'title' : 'Мощность',
                    'values' : values['Power']
                },   
                {
                    'title' : 'Температуры',
                    'values' : values['Temps']
                },   
                {
                    'title' : 'Влагосодержание',
                    'values' : values['Moisture']
                },     
                {
                    'title' : 'Износ изоляции',
                    'values' : values['InsulationWear']
                }, 
                {
                    'title' : 'Состояние охлаждения',
                    'values' : values['CoolingStatus']
                },    
                {
                    'title' : 'Состояние РПН',
                    'values' : values['StateRPN']
                }, 
                {
                    'title' : 'Состояние вводов',
                    'values' : values['StateInputs']
                }, 
                {
                    'title' : 'Внутренние потери    ',
                    'values' : values['InternalLosses']
                }, 
                {
                    'title' : 'Активность ЧР',
                    'values' : values['Chr']
                },    
                {
                    'title' : 'Нагрузочная способность',
                    'values' : values['LoadedCapacity']
                },   
                {
                    'title' : 'Оценка состояния',
                    'values' : values['State']
                }, 
                {
                    'title' : 'Анализ газов',
                    'values' : values['Gases']
                },          
            ]            
        }

        return result

    def GetDiagnostics(self):
        """Формирование данных диагностики"""
        return { "eventsArchive": self.diagnostics() }

    def diagnostics(self):
        """Массив диагностик"""
        
        values = []

        data = CalcResultsTransfDiag.objects.filter(inspection__in = Inspections.objects\
                                                            .filter(date__lte = self._dateEnd)\
                                                            .filter(date__gte = self._dateStart)\
                                                            .filter(asset = self._asset.pk)\
                                                            .order_by('-date')\
                                                            .values_list('id', flat=True)
                                                            )

        values = [
            { 
                "dateTime" : i.inspection.date, 
                "diagnosticText" : i.value,
                "diagnosticCode" : i.code
         } 
        for i in data]

        return values

    
###############################

    def tabPower(self, result = {}):
        """Данные по вкладке 'Мощность'"""
        values = self.fill_tab(MeasurmentsI, ['p_hv', 'p_mv','p_lv', 'q_hv','q_mv','q_lv', 's_hv','s_mv','s_lv'])
        result['Power'] = values
        return values

    def tabTemps(self, result = {}):
        """Данные по вкладке 'Температуры'"""

        properies = [f.name for f in MeasurmentsT._meta.get_fields()][2:]
        values = self.fill_tab(MeasurmentsT, properies)
        result['Temps'] = values
        return values

    def tabGases(self, result = {}):
        """Данные по вкладке 'Анализ газов'"""        

        properies = [f.name for f in MeasurmentsC._meta.get_fields()][2:]
        values = self.fill_tab(MeasurmentsC, properies)
        result['Gases'] = values
        return values

    def tabOvervoltage(self, result = {}):
        """Данные по вкладке 'Перенапряжения'"""
        result['Overvoltage'] = []

    def tabMoisture(self, result = {}):
        """Данные по вкладке 'Влагосодержание'"""
        result['Moisture'] = []

    def tabInsulationWear(self, result = {}):
        """Данные по вкладке 'Износ изоляции'"""
        result['InsulationWear'] = []

    def tabCoolingStatus(self, result = {}):
        """Данные по вкладке 'Состояние охлаждения'"""
        result['CoolingStatus'] = []

    def tabStateRPN(self, result = {}):
        """Данные по вкладке 'Состояние РПН'"""
        result['StateRPN'] = []

    def tabStateInputs(self, result = {}):
        """Данные по вкладке 'Состояние вводов'"""
        result['StateInputs'] = []

    def tabInternalLosses(self, result = {}):
        """Данные по вкладке 'Внутренние потери'"""
        result['InternalLosses'] = []

    def tabChr(self, result = {}):
        """Данные по вкладке 'Активность ЧР'"""
        result['Chr'] = []

    def tabLoadedCapacity(self, result = {}):
        """Данные по вкладке 'Нагруженная способность'"""
        result['LoadedCapacity'] = []

    def tabState(self, result = {}):
        """Данные по вкладке 'Оценка состояния'"""
        result['State'] = []
