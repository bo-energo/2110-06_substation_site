
from datetime import datetime
from dashboard.data.Abstract.ATabsAsset import ATabsAsset
from dashboard.data.transformator import transformator
from dashboard.models import Assets


class DetectionAsset:
    
    _asset = object
    _dateEnd = datetime
    _dateStart = datetime

    def __init__(self, transformator: str, dateStart: datetime = datetime(2001, 1, 1), dateEnd: datetime = datetime(2030, 1, 1)):
        """Конструктор"""

        self._asset= Assets.objects.all().filter(name = transformator).first()
        self._dateStart = dateStart
        self._dateEnd = dateEnd

    def TypeAsset(self):
        """Тип объекта мониторинга"""

        return self._asset.type.name

    def Distribution(self) -> ATabsAsset:
        """Определение класса по типу объекта"""
        
        type = self.TypeAsset()

        if type == 'трансформатор':
            return transformator(self._asset, self._dateStart, self._dateEnd)
        if type == '':
            raise