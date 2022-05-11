
from dashboard.models import *
from dashboard.data.Abstract.ATabsAsset import ATabsAsset


class transformatorCurrent(ATabsAsset):    

    def GetData(self):
        """Формирование данных для вкладок"""
        
        result = {
            'tabsData':[
                {
                    'title' : 'Insulation',
                    'values' : self.tabInsulation()
                },
                {
                    'title' : 'Moisture',
                    'values' : self.tabOilMoisture()
                },    
                {
                    'title' : 'Eleg',
                    'values' : self.tabOilEleg()
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

        return values

    def tabInsulation(self):
        """Данные по вкладке 'Изоляция'"""
        pass

    def tabOilMoisture(self):
        """Данные по вкладке 'Влажность масла'"""
        pass

    def tabOilEleg(self):
        """Данные по вкладке 'Состояние элегаза'"""
        pass