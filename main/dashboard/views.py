from asyncore import write
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import JsonResponse
from datetime import datetime, timedelta

from dashboard.data.DetectionAsset import DetectionAsset
from dashboard.models import AssetStatus, Inspections, Assets, Levels

def index(request):
    """Список объектов мониторинга"""

    assets_array = []

    for asset in Assets.objects.all():

        operation = DetectionAsset(asset.name).Distribution()

        count_inspections = Inspections.objects.filter(asset = asset.pk).count()
        if count_inspections != 0:
            assets_array.append({
                "title" : asset.name, 
                "status" : AssetStatus.objects.filter(inspection = Inspections.objects\
                                                    .filter(asset = asset.pk)\
                                                    .latest('date').id)\
                                                .first().level.name,
                "diagnotics" : operation.GetDiagnostics()
            })
        else:
            assets_array.append({
                "title" : asset.name, 
                "status" : 'Empty',
                "diagnotics" : ""
            })

    context = { 
        "assets" : assets_array
    }

    return render(request, 'index.html')
    return JsonResponse(context, json_dumps_params={'indent': 2})

@csrf_exempt
def selectTransform(request, name):
    """Выбор трансформатора"""

    context = {}

    dates = GetDates(request)

    operation = DetectionAsset(name, dates[0], dates[1]).Distribution()
    context = operation.GetData()

    return JsonResponse(context, json_dumps_params={'indent': 2})


@csrf_exempt
def updateArchive(request, name):
    """Обновление архива диагностики"""
    context = { }

    dates = GetDates(request)
        
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