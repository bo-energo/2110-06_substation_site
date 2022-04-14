import re
from django.shortcuts import render
from django.http import JsonResponse


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
    

def diagnostics(request):

    values = []

    for i in range(5):
        values.append(i)

    context = {
        'values': values,
        'coef': '12345'
    }

    return JsonResponse(context)

