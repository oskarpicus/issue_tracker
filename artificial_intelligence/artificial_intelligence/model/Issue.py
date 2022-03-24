from artificial_intelligence.model.IssueType import IssueType
from artificial_intelligence.model.Severity import Severity
from artificial_intelligence.model.Status import Status


class Issue:
    def __init__(self, identifier: int, title: str, description: str,
                 severity: Severity, status: Status, issue_type: IssueType):
        self._id = identifier
        self._title = title
        self._description = description
        self._severity = severity
        self._status = status
        self._issue_type = issue_type

    @property
    def id(self):
        return self._id

    @property
    def title(self):
        return self._title

    @title.setter
    def title(self, other):
        self._title = other

    @property
    def description(self):
        return self._description

    @property
    def severity(self):
        return self._severity

    @property
    def status(self):
        return self._status

    @property
    def issue_type(self):
        return self._issue_type

    def lower(self):
        return self._title.lower()

    def __str__(self):
        return self._title
