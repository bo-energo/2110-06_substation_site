
from dashboard.models import *
from dashboard.data.Abstract.ATabsAsset import ATabsAsset


class disconnectors(ATabsAsset):    

    def GetData(self):
        """Формирование данных для вкладок"""
        
        result = {
            'tabsData':[
                {
                    'title' : 'State',
                    'values' : self.tabState()
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

    def tabState(self):
        """Данные по вкладке 'Состояние'"""
        pass

