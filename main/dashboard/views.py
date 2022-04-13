from django.shortcuts import render


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

    return render(request, context=context)
