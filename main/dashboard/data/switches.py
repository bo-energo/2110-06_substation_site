from dashboard.models import *
from dashboard.data.Abstract.ATabsAsset import ATabsAsset

class switches(ATabsAsset):    

    def GetData(self):
        """Формирование данных для вкладок"""
        
        result = {
            'tabsData':[
                {
                    'title' : 'Overvoltage',
                    'values' : self.tabOvervoltage()
                },
                {
                    'title' : 'StateInput',
                    'values' : self.tabStateInputs()
                },    
                {
                    'title' : 'Eleg',
                    'values' : self.tabEleg()
                },   
                {
                    'title' : 'Chr',
                    'values' : self.tabChr()
                },   
                {
                    'title' : 'Arcing',
                    'values' : self.tabArcing()
                },    
                {
                    'title' : 'WorkParams',
                    'values' : self.tabWorkParams()
                },    
                {
                    'title' : 'Hydraulic',
                    'values' : self.tabHydraulic()
                },    
                {
                    'title' : 'SwitchingParameters',
                    'values' : self.tabSwitchingParameters()
                },    
                {
                    'title' : 'Vibrodiagnostics',
                    'values' : self.tabVibrodiagnostics()
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

    def tabStateInputs(self):
        """Данные по вкладке 'Состояние вводов'"""
        pass

    def tabEleg(self):
        """Данные по вкладке 'Состояние элегаза'"""
        pass

    def tabChr(self):
        """Данные по вкладке 'Активность ЧР'"""
        pass

    def tabArcing(self):
        """Данные по вкладке 'Ресурс дугогасительного устройства'"""
        pass

    def tabWorkParams(self):
        """Данные по вкладке 'Рабочие параметры'"""
        pass

    def tabHydraulic(self):
        """Данные по вкладке 'Ресурс гидропривода'"""
        pass

    def tabSwitchingParameters(self):
        """Данные по вкладке 'Параметры коммутации'"""
        pass

    def tabVibrodiagnostics(self):
        """Данные по вкладке 'Вибродиагностика'"""
        pass
