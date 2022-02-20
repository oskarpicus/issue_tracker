import string
from abc import abstractmethod

import nltk
from joblib import load
from nltk import WordNetLemmatizer


def __install_packages():
    """
    Method for installing the necessary packaged from the nltk library
    :return:
    """
    try:
        nltk.data.find('stopwords')
        nltk.data.find('wordnet')
        nltk.data.find('omw-1.4')
    except LookupError:
        nltk.download('stopwords')
        nltk.download('wordnet')
        nltk.download('omw-1.4')


__install_packages()


class AbstractNLPClassifier:

    def __init__(self, model_path: str, stopwords: list):
        self._model_path = model_path
        self.__stopwords = stopwords
        self._classifier = None
        self._vectorizer = None

        if model_path is not None:
            self.__read_model()

    @abstractmethod
    def train_model(self, path: str):
        """
        Method for training an AI model, based on its title
        :param path: the path to save the model to, in addition to its vocabulary and its performance report
        :return:
        """
        pass

    @abstractmethod
    def predict(self, text: str):
        """
        Method for predicting a certain component of an issue, based on some text from its corpus
        :param text: part of the issue's corpus to predict its component
        :return:
        """
        pass

    def _pre_process_text(self, text: str) -> str:
        """
        Method for pre processing a piece of text. Involves operations such as removing punctuations, lowering the
        characters and removing the stop words
        :param text: the piece of text to transform
        :return: the transformed piece of text
        """
        removed_punctuations = "".join([i for i in text if i not in string.punctuation])
        lowered = removed_punctuations.lower()
        removed_stopwords = " ".join([word for word in lowered.split(" ") if word not in self.__stopwords])
        result = " ".join([WordNetLemmatizer().lemmatize(word) for word in removed_stopwords.split(" ")])
        return result

    def __read_model(self):
        """
        Method for reading an AI model from a .joblib file
        :return:
        """
        data = load(self._model_path)
        self._vectorizer = data["vectorizer"]
        self._classifier = data["model"]
