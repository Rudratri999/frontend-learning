from celery import Celery

celery_app = Celery(
    "expense_tracker",
    # here /0 is the datyabase number, you can use any number from 0 to 15
    broker="redis://redis:6379/0"
)
celery_app.conf.imports = ("tasks",)