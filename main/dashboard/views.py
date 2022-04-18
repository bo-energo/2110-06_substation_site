from asyncore import write
from datetime import date
from email import contentmanager
import re
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import JsonResponse
from datetime import datetime, date, time

from dashboard.data.measurments import measurments 

def index(request):
    return render(request, 'index.html')

def transofrmList(request):

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

    context = {}

    meas = measurments(name)
    context = meas.getGases()


    return JsonResponse(context, json_dumps_params={'indent': 2})


@csrf_exempt
def updateArchive(request, name):
    context = { }
    dateStart = date(2000, 1, 1)
    dateEnd = datetime.now

    if request.method == 'GET':
        dateStart = request.GET['dateStart']
        dateEnd = request.GET['dateEnd']
    elif request.method == 'POST':
        dateStart = request.GET['dateStart']
        dateEnd = request.GET['dateEnd']
    
    return JsonResponse(context, json_dumps_params={'indent': 2})