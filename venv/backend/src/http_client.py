from aiohttp import ClientSession
from pydantic_settings import BaseSettings, SettingsConfigDict

# Настройки
class Settings(BaseSettings):
    CMC_API_TOKEN: str
    model_config = SettingsConfigDict(env_file="../.env")

settings = Settings()

# HTTP-клиент
class HTTPClient:
    def __init__(self, base_url: str, api_key: str):
        self.base_url = base_url
        self.api_key = api_key
        self._session = ClientSession(
            headers={'X-CMC_PRO_API_KEY': api_key}
        )

    async def close(self):
        await self._session.close()

# CoinMarketCap HTTP-клиент
class CMCHTTPClient(HTTPClient):
    async def get_listings(self):
        async with self._session.get(f"{self.base_url}/v1/cryptocurrency/listings/latest") as resp:
            result = await resp.json()  # Дождаться результата
            return result["data"]

    async def get_currency(self, currency_id: int):
        async with self._session.get(
            f"{self.base_url}/v2/cryptocurrency/quotes/latest",
            params={"id": currency_id}
        ) as resp:
            result = await resp.json()  # Дождаться результата
            return result["data"]