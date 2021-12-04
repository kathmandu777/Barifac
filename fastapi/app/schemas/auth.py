from fastapi import Form


class AuthRequestSchema:
    """認証に関するスキーマ"""

    def __init__(
        self,
        username: str = Form(...),
        password: str = Form(...),
    ):
        self.email = username
        self.password = password
