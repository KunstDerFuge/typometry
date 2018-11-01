from django.db import models
import numpy as np


class Word(models.Model):
    text = models.CharField(max_length=64, unique=True, db_index=True)
    # Metadata about user's typing can be stored here, so that it will be
    # carried over to other languages containing the same words.

    def __str__(self):
        return self.text


class Language(models.Model):
    name = models.CharField(max_length=32, unique=True, db_index=True)
    words = models.ManyToManyField(Word, through='WordEntry')

    def __str__(self):
        return self.name

    def get_words(self, top_n=None):
        if not top_n:
            return self.words.all()
        return self.words.filter(rank__lte=top_n)

    def get_samples(self, num_samples, top_n=None):
        words = self.get_words(top_n)
        words_freq = list(words.values_list('frequency', flat=True))
        probabilities = words_freq / np.linalg.norm(words_freq, ord=1)
        return list(np.random.choice(words, num_samples, p=probabilities))


class WordEntry(models.Model):
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    frequency = models.PositiveIntegerField(default=0)
    rank = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ('rank', 'language')
