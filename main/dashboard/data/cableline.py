
from dashboard.models import *
from dashboard.data.Abstract.ATabsAsset import ATabsAsset


class cableline(ATabsAsset):    

    def GetData(self):
        """Формирование данных для вкладок"""
        
        result = {
            'tabsData':[
                {
                    'title' : 'ThermalControl',
                    'values' : self.tabThermalControl()
                },
                {
                    'title' : 'VibrationControl',
                    'values' : self.tabVibrationControl()
                },    
                {
                    'title' : 'Currents',
                    'values' : self.tabCurrents()
                },   
                {
                    'title' : 'Chr',
                    'values' : self.tabChr()
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

    def tabThermalControl(self):
        """Данные по вкладке 'Термоконтроль'"""
        pass

    def tabVibrationControl(self):
        """Данные по вкладке 'Виброконтроль'"""
        pass

    def tabCurrents(self):
        """Данные по вкладке 'Токи в экранах'"""
        pass

    def tabChr(self):
        """Данные по вкладке 'Активность ЧР'"""
        pass