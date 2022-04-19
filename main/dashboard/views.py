from asyncore import write
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import JsonResponse
from datetime import datetime, timedelta

from dashboard.data.measurments import measurments
from dashboard.data.DetectionAsset import DetectionAsset 

def index(request):
    """Главная страница"""
    return render(request, 'index.html')

def transofrmList(request):
    """Список объектов мониторинга"""

    context = {
        "transformators": [
            {
                "title" : "AT-1",
                "status" : "critical",
                "diagnotics" : [
                    "critical string diagnostic 1",
                    "critical string diagnostic 2"
                ]
            },
            {
                "title" : "AT-2",
                "status" : "normal",
                "diagnotics" : [
                    "critical string diagnostic 1",
                    "critical string diagnostic 2",
                    "critical string diagnostic 3"
                ]
            },
            {
                "title" : "AT-3",
                "status" : "normal",
                "diagnotics" : [
                ]
            }
        ],
    }

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