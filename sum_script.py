import sys
import json
import spacy 
nlp = spacy.load('en_core_web_lg')
from spacy.lang.en.stop_words import STOP_WORDS
from string import punctuation
from heapq import nlargest

# retreiving the passed data from node js
raw_docx = sys.argv[1]
raw_text = raw_docx
docx = nlp(raw_text)
# listing out the stop words using spacy library
stopwords = list(STOP_WORDS)

# check the word frequency and tokenise these words
word_frequencies = {}  
for word in docx:  
    if word.text not in stopwords:
        if word.text not in word_frequencies.keys():
            word_frequencies[word.text] = 1
        else:
            word_frequencies[word.text] += 1


maximum_frequncy = max(word_frequencies.values())

for word in word_frequencies.keys():  
    word_frequencies[word] = (word_frequencies[word]/maximum_frequncy)
    
# sentence tokens
sentence_list = [ sentence for sentence in docx.sents ]

# calculate sentence scores
sentence_scores = {}  
for sent in sentence_list:  
    for word in sent:
        if word.text.lower() in word_frequencies.keys():
            if len(sent.text.split(' ')) < 30:
                if sent not in sentence_scores.keys():
                    sentence_scores[sent] = word_frequencies[word.text.lower()]
                else:
                    sentence_scores[sent] += word_frequencies[word.text.lower()]

# find N Largest and join the sentences
summarized_sentences = nlargest(7, sentence_scores, key=sentence_scores.get)
final_sentences = [ w.text for w in summarized_sentences ]
summary = ' '.join(final_sentences)

# pass summary to node js
print(summary)

sys.stdout.flush()
