
from datetime import datetime
from numpy import array
from pytest import param

from dashboard.models import *
from dashboard.data.Abstract.ATabsAsset import ATabsAsset


class transformator(ATabsAsset):    

    def GetData(self):
        """Формирование данных для вкладок"""
        
        result = {
            'tabsData':[
                {
                    'title' : 'Gases',
                    'values' : self.tabGases()
                },
                {
                    'title' : 'WorkParams',
                    'values' : self.tabWorkParams()
                },                
            ]            
        }

        return result

    def GetDiagnostics(self):
        """Формирование данных диагностики"""
        return { "eventsArchive": self.diagnostics() }

    def diagnostics(self) -> array:
        """Массив диагностик"""
        
        values = []

        data = CalcResultsTransfDiag.objects.filter(inspection__in = Inspections.objects\
                                                            .filter(date__lte = self._dateEnd)\
                                                            .filter(date__gte = self._dateStart)\
                                                            .filter(asset = self._asset.pk)\
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

    def tabWorkParams(self) -> array:
        """Данные по вкладке 'Рабочие параметры'"""
        pass

    def tabGases(self) -> array:
        """Данные по вкладке 'Газы'"""
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
