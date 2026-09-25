import os
from pydantic_settings import BaseSettings if os.path.exists("pydantic_settings") else object

class Settings:
    PROJECT_NAME: str = "WeatherMind AI Service"
    VERSION: str = "1.0.0"
    API_PREFIX: str = ""
    ALLOWED_ORIGINS: list = ["*"]

settings = Settings()
