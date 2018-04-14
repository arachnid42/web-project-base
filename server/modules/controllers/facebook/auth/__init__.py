from modules.controllers.base import ControllerBase
from modules.config import facebook
from datetime import datetime
import json


def access_token_debug_url(input_token=None):
    return "/debug_token?input_token={0}&access_token={1}".format(
        input_token,
        facebook.APP_ACCESS_TOKEN
    )


class Auth(ControllerBase):

    def get_authorization_url(
        self,
        redirect_uri=None,
        scope="public_profile,email",
        state={}
    ):
        return (
            "https://www.facebook.com/v2.12/dialog/oauth?" +
            "redirect_uri={0}" +
            "&app_id={1}"
            "&response_type=code" +
            "&scope={2}" +
            "&state=\"{3}\""
        ).format(
            redirect_uri,
            facebook.APP_ID,
            scope,
            json.dumps(state)
        )

    def exchange_code(
        self,
        code=None,
        redirect_uri=None
    ):
        response = self.root.get(
            "/oauth/access_token",
            dict(
                redirect_uri=redirect_uri,
                client_id=facebook.APP_ID,
                client_secret=facebook.APP_SECRET_KEY,
                code=code
            )
        )

        access_token_response = self.root.get(
            "/oauth/access_token",
            dict(
                redirect_uri=redirect_uri,
                client_id=facebook.APP_ID,
                client_secret=facebook.APP_SECRET_KEY,
                grant_type="fb_exchange_token",
                fb_exchange_token=response['access_token']
            )
        )

        token_debug_response = self.root.get(
            "/debug_token",
            dict(
                input_token=response['access_token'],
                access_token=facebook.APP_ACCESS_TOKEN
            )
        )

        if token_debug_response['data']['app_id'] != facebook.APP_ID:
            raise ValueError("Token does not belong to current app")
        if not token_debug_response['data']['is_valid']:
            raise ValueError("Token is invalid")

        profile_response = self.root.get(
            "/me",
            dict(
                fields=",".join([
                    "first_name",
                    "last_name",
                    "email"
                ]),
                access_token=access_token_response['access_token']
            )
        )

        access_token_expires_at = \
            datetime.fromtimestamp(token_debug_response["data"]['expires_at'])

        login_data = dict(
            email=profile_response['email'],
            name=dict(
                first=profile_response['first_name'],
                last=profile_response['last_name']
            ),
            accessToken=access_token_response['access_token'],
            accessTokenExpiresAt=access_token_expires_at
        )

        return login_data
