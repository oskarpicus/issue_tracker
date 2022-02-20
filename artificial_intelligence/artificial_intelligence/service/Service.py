from artificial_intelligence.ai_models.LabelClassifier import LabelClassifier
from artificial_intelligence.ai_models.SeverityClassifier import SeverityClassifier
from artificial_intelligence.model.IssueType import IssueType
from artificial_intelligence.model.SeverityLevel import SeverityLevel


class Service:
    def __init__(self, severity_classifier: SeverityClassifier, label_classifier: LabelClassifier):
        self.__severity_classifier = severity_classifier
        self.__label_classifier = label_classifier

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
