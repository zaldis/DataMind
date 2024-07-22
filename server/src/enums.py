from enum import Enum


class InsightType(Enum):
    BEARING = 'bearing'
    GEAR = 'gear'
    MOTOR = 'motor'


class InsightSeverity(Enum):
    HEALTHY = 'healthy'
    ALARM = 'alarm'
    CRITICAL = 'critical'
