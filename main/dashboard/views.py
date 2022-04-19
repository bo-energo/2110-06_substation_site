from asyncore import write
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import JsonResponse
from datetime import datetime, timedelta

from dashboard.data.measurments import measurments
from dashboard.data.DetectionAsset import DetectionAsset
from dashboard.models import AssetStatus, Inspections, Assets, Levels

# def index(request):
#     """Главная страница"""
#     return render(request, 'index.html')

def index(request):
    """Список объектов мониторинга"""

    assets_array = []

    for asset in Assets.objects.all():
        count_inspections = Inspections.objects.filter(asset = asset.pk).count()
        if count_inspections != 0:
            assets_array.append({
                "title" : asset.name, 
                "status" : AssetStatus.objects.filter(inspection = Inspections.objects\
                                                    .filter(asset = asset.pk)\
                                                    .latest('date').id)\
                                                .first().level.name,
            })
        else:
            assets_array.append({
                "title" : asset.name, 
                "status" : 'Empty',
            })

    context = { 
        "assets" : assets_array
    }

    # x = [ [  { 
    #             "title" : i.inspection.asset.name, 
    #             "status" : i.level.name,
    #      } for i in AssetStatus.objects.filter(inspection = Inspections.objects\
    #                                                         .filter(asset = asset.pk)\
    #                                                         .latest('date').id)] for asset in Assets.objects.all()
    #     ]

    # context = {
    #     "assets": [
    #         {
    #             "title" : "AT-1",
    #             "status" : "critical",
    #             "diagnotics" : [
    #                 "critical string diagnostic 1",
    #                 "critical string diagnostic 2"
    #             ]
    #         },
    #         {
    #             "title" : "AT-2",
    #             "status" : "normal",
    #             "diagnotics" : [
    #                 "critical string diagnostic 1",
    #                 "critical string diagnostic 2",
    #                 "critical string diagnostic 3"
    #             ]
    #         },
    #         {
    #             "title" : "AT-3",
    #             "status" : "normal",
    #             "diagnotics" : [
    #             ]
    #         }
    #     ],
    # }

    return render(context, 'index.html')
    return JsonResponse(context, json_dumps_params={'indent': 2})

@csrf_exempt
def selectTransform(request, name):
    """Выбор трансформатора"""

    context = {}

    dates = GetDates(request=request)

    operation = DetectionAsset(name, dates[0], dates[1]).Distribution()
    context = operation.GetData()

    return JsonResponse(context, json_dumps_params={'indent': 2})


@csrf_exempt
def updateArchive(request, name):
    """Обновление архива диагностики"""
    context = { }

    dates = GetDates(request=request)
        
    operation = DetectionAsset(name, dates[0], dates[1]).Distribution()
    context = operation.GetDiagnostics()
    
    return JsonResponse(context, json_dumps_params={'indent': 2})

def GetDates(request):
    
    dateStart = datetime
    dateEnd = datetime

    if request.method == 'POST':
        try:
            dateStart = request.POST['dateStart']
        except:
            dateStart = datetime.today() - timedelta(days=1000)

        try:
            dateEnd = request.POST['dateEnd']
        except:
            dateEnd = datetime.today()
            
    if request.method == 'GET':
        try:
            dateStart = request.GET['dateStart']
        except:
            dateStart = datetime.today() - timedelta(days=1000)

        try:
            dateEnd = request.GET['dateEnd']
        except:
            dateEnd = datetime.today()
    
    return dateStart, dateEnd