
from dashboard.models import *
from dashboard.data.Abstract.ATabsAsset import ATabsAsset


class surgeArresters(ATabsAsset):    

    def GetData(self):
        """Формирование данных для вкладок"""
        
        result = {
            'tabsData':[
                {
                    'title' : 'Currents',
                    'values' : self.tabCurrents()
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

    def tabCurrents(self):
        """Данные по вкладке 'Токи'"""
        pass

