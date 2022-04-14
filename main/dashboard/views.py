from django.shortcuts import render
from django.http import JsonResponse


def index(request):
    return render(request, 'index.html')

def diagnostics(request):

    values = []

    for i in range(5):
        values.append(i)

    context = {
        'values': values,
        'coef': '12345'
    }

    return JsonResponse(context)

