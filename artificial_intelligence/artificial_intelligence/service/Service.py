from artificial_intelligence.ai_models.SeverityClassifier import SeverityClassifier
from artificial_intelligence.model.SeverityLevel import SeverityLevel


class Service:
    def __init__(self, severity_classifier: SeverityClassifier):
        self.__severity_classifier = severity_classifier

    def compute_suggested_severity(self, title: str) -> SeverityLevel:
        """
        Method for predicting the severity level of an issue, based on its title, using a pre-trained AI model
        :param title: the title of the issue to be classified
        :return: the predicted severity level of the issue with the corresponding title
        """
        return self.__severity_classifier.predict(title)
