
from datetime import datetime
from pytest import param

from sqlalchemy import values
from dashboard.models import *

class measurments:

    _asset = object

    def __init__(self, transformator):
        self._asset= Assets.objects.all().filter(name = transformator).first()

    def getGases(self, dateStart: datetime = datetime(2001, 1, 1), dateEnd: datetime = datetime(2030, 1, 1)):

        values = []

        data = MeasurmentsC.objects.filter(inspection__in = Inspections.objects\
                                                            .filter(date__lte = dateEnd)\
                                                            .filter(date__gte = dateStart)\
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

        result = {
            'title' : 'Gases',
            'valeus' : values
        }

        return result


    def unionDict(self, date, obj, atr):
        dict = {
            "dateTime" : str(date),
            "value" : getattr(obj, atr)
        }
        return dict


    def getLimit(self, atr):

        lim = Params.objects.all().filter(name = atr).first()

        if (lim != None):
            return Pdata.objects.all().filter(asset_id = self._asset.pk).filter(param = lim.id).first().value
        else:
            return 0 
