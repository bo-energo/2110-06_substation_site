from asyncio.windows_events import NULL
from asgiref.sync import sync_to_async
from datetime import datetime

from dashboard.models import Params, Pdata
from abc import ABC, abstractmethod

from dashboard.models import *

class ATabsAsset(ABC):
    
    _asset = object
    _dateEnd = datetime
    _dateStart = datetime

    def __init__(self, asset: Assets, dateStart, dateEnd):
        """Констуктор"""
        self._asset= asset
        self._dateStart = dateStart
        self._dateEnd = dateEnd
        
    @abstractmethod
    def GetData(self):
        """Данные"""
        pass

    @abstractmethod
    def GetDiagnostics(self):
        """Диагнсотика"""
        pass
    
    def unionDict(self, date: datetime, obj: object, atr: str):
        """Объединение данных в словарь"""
        dict = {
            "dateTime" : str(date),
            "value" : getattr(obj, atr)
        }
        return dict

    def getValue(self, obj: object, atr: str):
        value = 0.0
        try:
            value = getattr(obj, atr)
        except: 
            value = None
        
        return value

    def getLimit(self, atr: str):
        """Получение уставок"""

        lim = Params.objects.all().filter(name = atr).first()

        if (lim != None):
            return Pdata.objects.all().filter(asset_id = self._asset.pk).filter(param = lim.id).first().value
        else:
            return 0 

    def fill_tab(self, measurment: list, properies: list):

        values = []
        data = measurment.objects.filter(inspection__in = Inspections.objects\
                                                            .filter(date__lte = self._dateEnd)\
                                                            .filter(date__gte = self._dateStart)\
                                                            .filter(asset = self._asset.pk)\
                                                            .order_by('date')\
                                                            .values_list('id', flat=True)
                                                            )

        data = data.order_by('inspection__date')
        for property in properies:                
            
            values.append({
                'legendName' : property,
                'unit':'',
                'dz' : self.getLimit(property[2:] + '_lim0'),
                'pdz' : self.getLimit(property[2:] + '_lim1'),
                'lastValue' : self.getValue(data.last(), property),
                'values' : [self.unionDict(i.inspection.date, i, property) for i in data],
                })

        return values