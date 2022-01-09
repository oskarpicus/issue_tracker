import string

import nltk
import pandas as pd
from joblib import dump, load
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import ComplementNB

from artificial_intelligence.model.SeverityLevel import SeverityLevel


class SeverityClassifier:
    __approved_stopwords = ["no", "not", "nor"]
    __dataset_path = "resources/datasets/severity/severityDataset.csv"

    def __init__(self, model_path: str = None):
        self.__model_path = model_path
        self.__classifier = None
        self.__vectorizer = None

        if model_path is not None:
            self.__read_model()

        self.__install_packages()
        self.__stopwords = [word for word in stopwords.words('english')
                            if word not in SeverityClassifier.__approved_stopwords]

    def train_model(self, path: str):
        """
        Method for training a model for predicting the severity level of an issue, based on its title
        :param path: the path to save the model to, in addition to its vocabulary and its performance report
        :return:
        """
        self.__model_path = path
        issues = pd.read_csv(SeverityClassifier.__dataset_path)

        # pre process the data
        issues["Summary"] = issues["Summary"].apply(lambda t: self.__pre_process_text(t))
        issues["Priority"] = issues["Priority"].map({"Trivial": SeverityLevel.non_severe.name,
                                                     "Minor": SeverityLevel.non_severe.name,
                                                     "Major": SeverityLevel.non_severe.name,
                                                     "Critical": SeverityLevel.severe.name,
                                                     "Blocker": SeverityLevel.severe.name})

        self.__vectorizer = CountVectorizer()
        summary = self.__vectorizer.fit_transform(list(issues["Summary"])).toarray()

        x_train, x_test, y_train, y_test = train_test_split(summary, list(issues["Priority"]), random_state=0,
                                                            train_size=0.8)

        self.__classifier = ComplementNB()
        self.__classifier.fit(x_train, y_train)
        y_pred = self.__classifier.predict(x_test)

        performance = classification_report(y_test, y_pred, target_names=issues["Priority"].unique())

        dump({"model": self.__classifier, "vectorizer": self.__vectorizer, "performance": performance}, path)

    def predict(self, title: str) -> SeverityLevel:
        """
        Method for predicting the severity level of a new issue, based on its title
        :param title: the title of the issue
        :return: the predicted SeverityLevel of the issues with the given title
        """
        pre_processed = self.__pre_process_text(title)
        bag_of_words = self.__vectorizer.transform([pre_processed]).toarray()
        prediction = self.__classifier.predict(bag_of_words)[0]
        return SeverityLevel[prediction]

    def __pre_process_text(self, text: str) -> str:
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

    def __install_packages(self):
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

    def __read_model(self):
        """
        Method for reading an AI model for predicting the severity level from a .joblib file
        :return:
        """
        data = load(self.__model_path)
        self.__vectorizer = data["vectorizer"]
        self.__classifier = data["model"]
