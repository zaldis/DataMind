import datetime as dt
import uuid

from . import schemas, enums


MOCKED_USERS = [
    schemas.User(
        username="anton.ivanov",
        first_name="Anton",
        last_name="Ivanov",
        email="anton.ivanov@mail.com",
        password="fake_hash_password_123",
    ),
]

MOCKED_INSIGHTS = [
    schemas.MachineInsight(
        id=uuid.uuid4(),
        created_at=dt.datetime.now(),
        type=enums.InsightType.GEAR,
        severity=enums.InsightSeverity.ALARM,
    ),
    schemas.MachineInsight(
        id=uuid.uuid4(),
        created_at=dt.datetime.now(),
        type=enums.InsightType.MOTOR,
        severity=enums.InsightSeverity.CRITICAL,
    ),
    schemas.MachineInsight(
        id=uuid.uuid4(),
        created_at=dt.datetime.now(),
        type=enums.InsightType.BEARING,
        severity=enums.InsightSeverity.HEALTHY,
    ),
]
