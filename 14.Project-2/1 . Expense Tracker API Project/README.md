# Expense Tracker FastAPI

A simple expense tracker API built with FastAPI, SQLAlchemy, and PostgreSQL.

## Features
- User registration and login
- JWT authentication
- Create, read, update, delete categories
- Create, read, update, delete expenses
- Expense summaries by category and monthly aggregation

## Setup

1. Create and activate a virtual environment:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

2. Install dependencies:

```powershell
pip install -r requirements.txt
```

3. Configure environment variables:

Create a `.env` file with values for:

```text
SECRET_KEY=your_secret_key
DATABASE_URL=postgresql://user:password@localhost:5432/expense_tracker_db
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

4. Run the app:

```powershell
uvicorn main:app --reload
```

## API Endpoints

- `POST /register` - Register a new user
- `POST /login` - Get JWT token
- `GET /profile` - Get the current user profile
- `POST /categories` - Create category
- `GET /categories` - Get categories
- `GET /categories/{id}` - Get category by id
- `PUT /categories/{id}` - Update category
- `DELETE /categories/{id}` - Delete category
- `POST /expenses` - Create expense
- `GET /expenses` - Get expenses
- `GET /expenses/{id}` - Get expense by id
- `PUT /expenses/{id}` - Update expense
- `DELETE /expenses/{id}` - Delete expense
- `GET /expenses/summary` - Get expense summary
- `GET /expenses/summary-by-category` - Get summary by category
- `GET /expenses/monthly-summary` - Get monthly summary

## Notes
- Ensure PostgreSQL is running and the database exists.
- Use the access token from login in the `Authorization` header as `Bearer <token>`.

## Database Migrations
If you are using Alembic for migrations, run:

```powershell
alembic upgrade head
```

If you need to create a new migration after changing models:

```powershell
alembic revision --autogenerate -m "migration message"
alembic upgrade head
```

## Example Requests

Register a new user:

```bash
curl -X POST http://127.0.0.1:8000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"user1", "password":"secret", "email":"user1@example.com"}'
```

Login and get a token:

```bash
curl -X POST http://127.0.0.1:8000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user1", "password":"secret"}'
```

Create a new category:

```bash
curl -X POST http://127.0.0.1:8000/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"name":"Food"}'
```

Create a new expense:

```bash
curl -X POST http://127.0.0.1:8000/expenses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title":"Lunch","amount":12.50,"description":"Lunch at cafe","expense_date":"2026-07-16","category_id":1}'
```
