
from dashboard.models import *
from dashboard.data.Abstract.ATabsAsset import ATabsAsset


class transformator(ATabsAsset):    

    def GetData(self):
        """Формирование данных для вкладок"""
        
        result = {
            'tabsData':[
                {
                    'title' : 'Overvoltage',
                    'values' : self.tabOvervoltage()
                },    
                {
                    'title' : 'Power',
                    'values' : self.tabPower()
                },   
                {
                    'title' : 'Temps',
                    'values' : self.tabTemps()
                },   
                {
                    'title' : 'Moisture',
                    'values' : self.tabMoisture()
                },     
                {
                    'title' : 'InsulationWear',
                    'values' : self.tabInsulationWear()
                }, 
                {
                    'title' : 'CoolingStatus',
                    'values' : self.tabCoolingStatus()
                },    
                {
                    'title' : 'StateRPN',
                    'values' : self.tabStateRPN()
                }, 
                {
                    'title' : 'StateInputs',
                    'values' : self.tabStateInputs()
                }, 
                {
                    'title' : 'InternalLosses',
                    'values' : self.tabInternalLosses()
                }, 
                {
                    'title' : 'Chr',
                    'values' : self.tabChr()
                },    
                {
                    'title' : 'LoadedCapacity',
                    'values' : self.tabLoadedCapacity()
                },   
                {
                    'title' : 'State',
                    'values' : self.tabState()
                }, 
                {
                    'title' : 'Gases',
                    'values' : self.tabGases()
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

    def tabOvervoltage(self):
        """Данные по вкладке 'Перенапряжения'"""
        pass

    def tabPower(self):
        """Данные по вкладке 'Мощность'"""
        values = []

        data = MeasurmentsI.objects.filter(inspection__in = Inspections.objects\
                                                            .filter(date__lte = self._dateEnd)\
                                                            .filter(date__gte = self._dateStart)\
                                                            .filter(asset = self._asset.pk)\
                                                            .values_list('id', flat=True)
                                                            )

        properies = ['p_hv', 'p_mv','p_lv', 'q_hv','q_mv','q_lv', 's_hv','s_mv','s_lv']

        for property in properies:                
            
            values.append({
                'legendName' : property,
                'unit':'',
                'dz' : self.getLimit(property[2:] + '_lim0'),
                'pdz' : self.getLimit(property[2:] + '_lim1'),
                'values' : [self.unionDict(i.inspection.date, i, property) for i in data],
                })

        return values

    def tabTemps(self):
        """Данные по вкладке 'Температуры'"""
        values = []

        data = MeasurmentsT.objects.filter(inspection__in = Inspections.objects\
                                                            .filter(date__lte = self._dateEnd)\
                                                            .filter(date__gte = self._dateStart)\
                                                            .filter(asset = self._asset.pk)\
                                                            .values_list('id', flat=True)
                                                            )

        properies = [f.name for f in MeasurmentsT._meta.get_fields()][2:]

        for property in properies:                
            
            values.append({
                'legendName' : property.upper()[2:],
                'unit':'C',
                'dz' : self.getLimit(property[2:] + '_lim0'),
                'pdz' : self.getLimit(property[2:] + '_lim1'),
                'values' : [self.unionDict(i.inspection.date, i, gas) for i in data],
                })

        return values

    def tabMoisture(self):
        """Данные по вкладке 'Влагосодержание'"""
        pass

    def tabInsulationWear(self):
        """Данные по вкладке 'Износ изоляции'"""
        pass

    def tabCoolingStatus(self):
        """Данные по вкладке 'Состояние охлаждения'"""
        pass

    def tabStateRPN(self):
        """Данные по вкладке 'Состояние РПН'"""
        pass

    def tabStateInputs(self):
        """Данные по вкладке 'Состояние вводов'"""
        pass

    def tabInternalLosses(self):
        """Данные по вкладке 'Внутренние потери'"""
        pass

    def tabChr(self):
        """Данные по вкладке 'Активность ЧР'"""
        pass

    def tabLoadedCapacity(self):
        """Данные по вкладке 'Нагруженная способность'"""
        pass

    def tabState(self):
        """Данные по вкладке 'Оценка состояния'"""
        pass

    def tabGases(self):
        """Данные по вкладке 'Анализ газов'"""
        values = []

        data = MeasurmentsC.objects.filter(inspection__in = Inspections.objects\
                                                            .filter(date__lte = self._dateEnd)\
                                                            .filter(date__gte = self._dateStart)\
                                                            .filter(asset = self._asset.pk)\
                                                            .values_list('id', flat=True)
                                                            )

        gases = [f.name for f in MeasurmentsC._meta.get_fields()][2:]

        for gas in gases:                
            
            values.append({
                'legendName' : gas.upper()[2:],
                'unit':'ppm',
                'dz' : self.getLimit(gas[2:] + '_lim0'),
                'pdz' : self.getLimit(gas[2:] + '_lim1'),
                'values' : [self.unionDict(i.inspection.date, i, gas) for i in data],
                })

        return values
