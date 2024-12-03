from fastapi import APIRouter
from init import cmc_client
router = APIRouter(
    prefix="/cryptocurrencies"
)
@router.get("")
async def get_cryptocurrencies():
    listings = await cmc_client.get_listings()  # Использовать await
    return listings

@router.get("/{currency_id}")
async def get_currency(currency_id: int):
    currency = await cmc_client.get_currency(currency_id)  # Использовать await
    return currency