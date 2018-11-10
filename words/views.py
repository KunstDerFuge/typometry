from django.http import JsonResponse
from words.models import Language


def word_list(request):
    if request.method == 'GET':
        # TODO: Make this language-agnostic
        # modify session, test
        request.session['test'] = 'test09090'
        english = Language.objects.first()
        words = english.get_samples(100, 5000)
        words = [word.word.text for word in words]
        words.append(request.session['test'])
        return JsonResponse(words, safe=False)
