import asyncio
from redis_client import redis_client

async def subscribe_to_expense_event():
    pubsub = redis_client.pubsub()

    await pubsub.subscribe("expense_events")
    print("Subscribed to expense_events")

    async for message in pubsub.listen():
        if message["type"] == "message":
            print("Received:" , message["data"])

# it used to start python when particulary runs subscriber.py
if __name__ == "__main__":
    asyncio.run(subscribe_to_expense_event())