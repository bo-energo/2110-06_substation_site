from dashboard.models import *
from dashboard.data.Abstract.ATabsAsset import ATabsAsset

class CRUE(ATabsAsset):    

    def GetData(self):
        """Формирование данных для вкладок"""
        
        result = {
            'tabsData':[
                {
                    'title' : 'Overvoltage',
                    'values' : self.tabOvervoltage()
                },
                {
                    'title' : 'WorkParams',
                    'values' : self.tabWorkParams()
                },    
                {
                    'title' : 'StateInputs',
                    'values' : self.tabStateInputs()
                },   
                {
                    'title' : 'Chr',
                    'values' : self.tabChr()
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

    def tabOvervoltage(self):
        """Данные по вкладке 'Перенапряжения'"""
        pass

    def tabWorkParams(self):
        """Данные по вкладке 'Рабочие параметры'"""
        pass

    def tabStateInputs(self):
        """Данные по вкладке 'Состояние вводов'"""
        pass

    def tabChr(self):
        """Данные по вкладке 'Активность ЧР'"""
        pass

    def tabEleg(self):
        """Данные по вкладке 'Состояние элегаза'"""
        pass
