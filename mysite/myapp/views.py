from django.shortcuts import render
from django.http import JsonResponse

def predict_view(request):
    if request.method == 'POST':
        text = request.POST.get('text', '')
        # TODO: process text and return prediction
        prediction = predict_text(text)
        return JsonResponse({'prediction': prediction})

