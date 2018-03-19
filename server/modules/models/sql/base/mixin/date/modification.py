from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.types import TIMESTAMP
from sqlalchemy import Column, func, DateTime


class ModificationDateTimeMixin:
    @declared_attr
    def modification_date_time(cls):
        return Column(
            DateTime(timezone=True),
            server_default=func.now(),
            onupdate=func.now(),
            nullable=False
        )
