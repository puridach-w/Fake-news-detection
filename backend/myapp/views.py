from django.shortcuts import render
from django.http import JsonResponse
import joblib
from django.views.decorators.csrf import csrf_exempt
import json
import pandas as pd

import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer

# download necessary resources
nltk.download('punkt')
nltk.download('stopwords')

# define a function to clean the text
def clean_text(text):
    # remove punctuations and numbers
    cleaned_text = ''.join(e for e in text if e.isalpha() or e.isspace())
    # convert to lowercase
    cleaned_text = cleaned_text.lower()
    # tokenize the text into words
    words = word_tokenize(cleaned_text)
    # remove stopwords
    stopword = stopwords.words('english')
    words = [word for word in words if word not in stopword]
    # stem the remaining words
    # stemmer = PorterStemmer()
    # words = [stemmer.stem(word) for word in words]
    # join the stemmed words back into a string
    cleaned_text = ' '.join(words)
    # print(cleaned_text)
    return cleaned_text


@csrf_exempt 
def predict_view(request):
    result = []
    if request.method == 'POST':
        data = json.loads(request.body)
        text = data.get('text')
        obj = {'text': [text]}
        data = pd.DataFrame(obj)
        
        data["text"] = data["text"].apply(clean_text)
        
        # Load the trained model
        model = joblib.load('news_detection_model.joblib')
        
        # Predict probabilities for each class
        proba = model.predict_proba(data["text"])
        
        # Make the prediction
        prediction = model.predict(data["text"])
        
        # result.append(prediction.tolist())

        # Display predicted class labels along with predicted probabilities
        for i, class_label in enumerate(model.classes_):
            result.append("Class '{}' - Probability = {:.2f}%".format(class_label, proba[0][i]*100))
        result.append("Predicted class = {}".format(prediction[0]))

        # list_data = prediction.tolist()

        # Return the result
        return JsonResponse({'prediction': result})
    else:
        return JsonResponse({'prediction': "getttttttt"})
    
    
def test(request):
    return render(request, 'hello/index.html')
