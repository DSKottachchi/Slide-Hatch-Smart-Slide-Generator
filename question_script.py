import sys
import json
import os
import nltk
import ssl

try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

# punkt sentence tokenizer
nltk.download('punkt')

# averaged_perceptron_tagger is used for tagging words with their parts of speech
nltk.download('averaged_perceptron_tagger')

# sentence tokenisation function
def tokenization(paragraph):
    sents = nltk.sent_tokenize(paragraph)
    words = [nltk.word_tokenize(sent) for sent in sents]
    return sents, words

# tag each word with parts of speech
def posTagging(words):
    posWords = [nltk.pos_tag(word) for word in words]
    return posWords

# retrieving data that has been passed from node js
paragraph = sys.argv[1]


# QUESTION GENERATION
sents, words = tokenization(paragraph)
posWords = posTagging(words)

i = 0
fillSents = sents
answers = []
for posWord in posWords:
    for x in posWord:
        # if the posword is equal to 'NN' (Noun)
        if (x[1] == 'NN'):
            # replace noun with blank line
            fillSents[i] = fillSents[i].replace(x[0], '__________')
            answers.append(x[0])
    i = i + 1


print ('Fill in the blanks')
print ('---------------------------------------------------')
i = 1
# create question sentence
for fillSent in fillSents:
    print (str(i) + '. ' + fillSent)
    print ('\n')
    i = i + 1




sys.stdout.flush()
