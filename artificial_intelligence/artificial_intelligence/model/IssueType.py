from enum import Enum


class IssueType(Enum):
    BUG = 0
    DOCUMENTATION = 1
    ENHANCEMENT = 2
    INVALID = 3
    WONT_FIX = 4
