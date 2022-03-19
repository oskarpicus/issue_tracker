from artificial_intelligence.ai_models.LabelClassifier import LabelClassifier
from artificial_intelligence.ai_models.OffensiveLanguageClassifier import OffensiveLanguageClassifier
from artificial_intelligence.ai_models.SeverityClassifier import SeverityClassifier
from artificial_intelligence.model.IssueType import IssueType
from artificial_intelligence.model.SeverityLevel import SeverityLevel


class Service:
    def __init__(self, severity_classifier: SeverityClassifier,
                 label_classifier: LabelClassifier,
                 offensive_language_classifier: OffensiveLanguageClassifier):
        self.__severity_classifier = severity_classifier
        self.__label_classifier = label_classifier
        self.__offensive_language_classifier = offensive_language_classifier

    def compute_suggested_severity(self, title: str) -> SeverityLevel:
        """
        Method for predicting the severity level of an issue, based on its title, using a pre-trained AI model
        :param title: the title of the issue to be classified
        :return: the predicted severity level of the issue with the corresponding title
        """
        return self.__severity_classifier.predict(title)

    def computed_suggested_type(self, title: str) -> IssueType:
        """
        Method for predicting the issue type of an issue, based on its title, using a pre-trained AI model
        :param title: the title of the issue to be classified
        :return: the predicted issue type of the issue with the corresponding title
        """
        return self.__label_classifier.predict(title)

    def compute_probability_is_offensive(self, text: str) -> float:
        """
        Method for computing the probability of a text to be offensive
        :param text: the text to be classified
        :return: the probability of the given text to be offensive
        """
        return self.__offensive_language_classifier.predict(text)
