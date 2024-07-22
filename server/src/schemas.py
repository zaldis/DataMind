import uuid
import datetime as dt

from pydantic import BaseModel

from . import enums


class LoginResponse(BaseModel):
    token: str


class ErrorResponse(BaseModel):
    detail: str


class InsightCreationResponse(BaseModel):
    diagnostic_id: uuid.UUID


class User(BaseModel):
    username: str
    password: str
    first_name: str
    last_name: str
    email: str


class MachineInsight(BaseModel):
    id: uuid.UUID
    created_at: dt.datetime
    type: enums.InsightType
    severity: enums.InsightSeverity

    @property
    def severity_level(self):
        match self.severity:
            case enums.InsightSeverity.HEALTHY: return 0
            case enums.InsightSeverity.ALARM: return 50
            case enums.InsightSeverity.CRITICAL: return 100
