
from dashboard.models import *
from dashboard.data.Abstract.ATabsAsset import ATabsAsset


class transformatorVoltage(ATabsAsset):    

    def GetData(self):
        """Формирование данных для вкладок"""
        
        result = {
            'tabsData':[
                {
                    'title' : 'OilMoisture',
                    'values' : self.tabOilMoisture()
                },
                {
                    'title' : 'InterturnShortCircuits',
                    'values' : self.tabInterturnShortCircuits()
                },    
                {
                    'title' : 'LeakageCurrent',
                    'values' : self.tabLeakageCurrent()
                },   
                {
                    'title' : 'Eleg',
                    'values' : self.tabEleg()
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

    def tabOilMoisture(self):
        """Данные по вкладке 'Влажность масла'"""
        pass

    def tabInterturnShortCircuits(self):
        """Данные по вкладке 'Межвитковые замыкания'"""
        pass

    def tabLeakageCurrent(self):
        """Данные по вкладке 'Ток утечки'"""
        pass

    def tabEleg(self):
        """Данные по вкладке 'Состояние элегаза'"""
        pass