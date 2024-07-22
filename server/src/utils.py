import datetime as dt
import uuid

from . import schemas, settings, enums


""" TODO
Some functionality from this file should be moved to the crud.py module.

- hashing password logic should be updated.
- crud operations might be updated with communication to DB layer.
"""


def decode_token(token: str) -> schemas.User:
    user = get_user_by_username(username=token)
    return user


def get_user_by_username(username: str) -> schemas.User:
    for user in settings.MOCKED_USERS:
        if user.username == username:
            return user
    raise ValueError(f"User with username {username} does not exist")


def hash_password(password: str) -> str:
    return f"fake_hash_password_{password}"


def create_machine_insight(
    created_at: dt.datetime,
    type: enums.InsightType,
    severity: enums.InsightSeverity,
) -> uuid.UUID:
    insight = schemas.MachineInsight(
        id=uuid.uuid4(),
        created_at=created_at,
        type=type,
        severity=severity,
    )
    settings.MOCKED_INSIGHTS.append(insight)
    return insight.id


def get_machine_insights(from_date: dt.datetime) -> list[schemas.MachineInsight]:
    return list(reversed(sorted(
        [
            insight for insight in settings.MOCKED_INSIGHTS
            if insight.created_at.date() >= from_date.date()
        ],
        key=lambda insight: [insight.created_at.date(), insight.severity_level]
    )))
