# it is a decorator which will tell that this function is a celery task and it can be executed in background
from celery_app import celery_app

# To acccess self.retry Celery needs to give the task object to your function that's why bind=true
@celery_app.task(bind=True, max_retries=3)
def say_hello(self, name):

    try:
        print(f"Processing task for {name}")

        # Simulate failure
        raise ConnectionError("External service unavailable")

    except ConnectionError as exc:
        raise self.retry(
            exc=exc,
            countdown=5
        )


# say_hello.delay("Rudra")
#         ↓
# Send to Redis → Worker executes ✅ 

# @celery_app.task(
#     autoretry_for=(Exception,),
#     retry_kwargs={"max_retries": 3},
#     retry_backoff=True
# )
# def say_hello(name):
#     print(f"Processing task for {name}")

#     raise Exception("Something went wrong!")

# Task -> connection error -> retry after 5 seconds -> connection error -> retry after 5 seconds -> connection error
#  -> retry after 5 seconds -> max retries reached → task failed

# autoretry_for
# → "Celery, automatically retry this exception."

# self.retry()
# → "Celery, I have detected a specific situation; retry now with these settings."