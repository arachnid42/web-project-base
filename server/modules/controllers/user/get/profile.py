from modules.models import sql
from modules.exceptions import MissingValueError, NotFoundError
from sqlalchemy.orm.exc import NoResultFound
from modules.controllers.base import ControllerBase


class Profile(ControllerBase):

    def get_profile(
        self,
        json=None,
        user_entity=None
    ):
        if user_entity is None:
            try:
                user_id = json['id']
                user_entity = self.sql_session\
                    .query(sql.User)\
                    .filter(sql.User.id == user_id)\
                    .one()
            except KeyError as e:
                raise MissingValueError(value=e.args[0])
            except NoResultFound:
                raise NotFoundError(value='user')
            return user_entity.json(timezone=self.timezone)
