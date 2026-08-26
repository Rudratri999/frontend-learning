from models import Category, Expense
from schemas import ExpenseCreate, ExpenseResponse , CategoryResponse
from fastapi import APIRouter, Depends, HTTPException  # type: ignore[import-not-found]
from auth import get_current_user
from database import get_db
import json
from redis_client import redis_client

router = APIRouter()


# 1. Get current_user
# 2. Find category using category_id
# 3. Category exists?
# 4. Category belongs to current_user?
# 5. Create expense


@router.post("/expenses", response_model=ExpenseResponse)
async def create_expense(
    
    expense: ExpenseCreate,
    current_user = Depends(get_current_user),
    db = Depends(get_db)
):
    category = db.query(Category).filter(
        Category.id == expense.category_id
    ).first()

    if category is None:
        raise HTTPException(
            status_code=404,
            detail="Not Found"
        )
    
    if category.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Forbidden"
        )
    
    new_expense = Expense(
        title = expense.title,
        amount = expense.amount,
        description = expense.description,
        expense_date = expense.expense_date,
        category_id = expense.category_id,
        user_id = current_user.id
    )
     
    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

# Every time when new expemse gets creted then old cache data gets delete
    cache_key = f"expense:summary:user:{current_user.id}"
    await redis_client.delete(cache_key)

# Publisher is created with channel name and message.
    await redis_client.publish(
        # channel name
        "expense_events",
        # Message
        f"Expense created by user {current_user.id}"
    )

    return new_expense

@router.get("/expenses/summary")
async def get_expense_summary(
    db = Depends(get_db),
    current_user = Depends(get_current_user)
):
    # get the cache key for particular user
    cache_key = f"expense:summary:user:{current_user.id}"

    # 1. we are getting if there is data inside redis or not
    cached = await redis_client.get(cache_key)

    if cached:
        # The recieved data=redis str and convert it into the py dict
        return json.loads(cached)

#    2. Below executes when cache miss happen then data fetch from DB directly
    expenses = db.query(Expense).filter(
        Expense.user_id == current_user.id
    ).all()

    if not expenses:
        result = {"total_expenses": 0, "total_amount": 0.0}
    else:
        total_expenses = len(expenses)
        total_amount = sum(expense.amount for expense in expenses)
        result = {
            "total_expenses": total_expenses, 
            "total_amount": float(total_amount)
        }

    # 3.store in redis
    await redis_client.setex(
        cache_key,
        60,
        # python dict -> redis string
        json.dumps(result)
    )

    return result

@router.get("/expenses/summary-by-category")
def get_expense_summary_by_category(
    db = Depends(get_db),
    current_user = Depends(get_current_user)
):
    categories = db.query(Category).filter(
          Category.user_id == current_user.id
    ).all()

    summary = []

    for category in categories :
        expenses = db.query(Expense).filter(
            Expense.category_id == category.id
        ).all()

        total_expenses = len(expenses)
        total_amount = sum(expense.amount for expense in expenses)
        summary.append(
              {
                  "category_id": category.id,
                  "category": category.name,
                  "total_expenses": total_expenses,
                  "total_amount": total_amount
               }
           )

    return summary

@router.get("/expenses/monthly-summary")
def monthly_summary(
    db = Depends(get_db),
    current_user = Depends(get_current_user)
):
    expenses = db.query(Expense).filter(
        Expense.user_id == current_user.id
    ).all()

    total_expenses = len(expenses)

    def get_year_month(expense):
        # Returns a tuple like (2026, 1)
        return (expense.expense_date.year, expense.expense_date.month)

    monthly_summary_data = {}
    for expense in expenses:
        year_month = get_year_month(expense)
        if year_month not in monthly_summary_data:
            monthly_summary_data[year_month] = {
                "total_expenses": 0,
                "total_amount": 0.0,
            }
        monthly_summary_data[year_month]["total_expenses"] += 1
        monthly_summary_data[year_month]["total_amount"] += float(expense.amount)

    summary = []
    for (year, month), data in sorted(monthly_summary_data.items()):
        summary.append({
            "year": year,
            "month": month,
            "total_expenses": data["total_expenses"],
            "total_amount": data["total_amount"],
        })

    return summary


# JWT
# ↓
# get_current_user()
# ↓
# current_user.id
# ↓
# Find all expenses where Expense.user_id == current_user.id
# ↓
# Return list of expenses

@router.get("/expenses", response_model=list[ExpenseResponse])
def get_expenses(
    current_user = Depends(get_current_user),
      db = Depends(get_db)
):
     
    expenses = db.query(Expense).filter(
        Expense.user_id == current_user.id
    ).all()

    if not expenses:
        return []

    return expenses

@router.get("/expenses/{id}", response_model=ExpenseResponse)
def get_expense_by_id (
    id : int,
    current_user = Depends(get_current_user),
    db = Depends(get_db)
):
    expense = db.query(Expense).filter(
        Expense.id == id
    ).first()

    if expense is None:
        raise HTTPException(
            status_code=404,
            detail="Not Found"
        )
    if expense.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail = "Forbidden"
        )
    
    return expense


@router.get("/categories/{category_id}/expenses", response_model=list[ExpenseResponse])
def get_expenses_by_category(
    category_id: int,
    current_user = Depends(get_current_user),
    db = Depends(get_db)
):

    expenses = db.query(Expense).filter(
        Expense.category_id == category_id,
        Expense.user_id == current_user.id
    ).all()

    return expenses

# Find expense
# ↓
# 404?
# ↓
# Ownership check
# ↓
# Update title
# Update amount
# Update description
# Update expense_date
# Update category_id (optional)
# ↓
# Commit
# ↓
# Refresh
# ↓
# Return expense

@router.put("/expenses/{id}", response_model=ExpenseResponse)
async def update_expense (
    id: int,
    Updated_expense : ExpenseCreate,
    current_user = Depends(get_current_user),
    db = Depends(get_db)
):
   
    
    expense = db.query(Expense).filter(
        Expense.id == id
    ).first()

    category = db.query(Category).filter(
        Category.id == Updated_expense.category_id
    ).first()

    if category is None:
            raise HTTPException(
            status_code=404,
            detail="Category Not Found"
        )

    if expense is None:
        raise HTTPException(
            status_code=404,
            detail="Not Found"
        )
    if expense.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail = "Forbidden"
        )
    
    if category.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Forbidden"
        )
    
    expense.title = Updated_expense.title
    expense.amount = Updated_expense.amount
    expense.description = Updated_expense.description
    expense.expense_date = Updated_expense.expense_date
    expense.category_id = Updated_expense.category_id
    
    db.commit()
    db.refresh(expense)

    cache_key = f"expense:summary:user:{current_user.id}"
    await redis_client.delete(cache_key)

    return expense


@router.delete("/expenses/{id}")
async def delete_expense(
    id : int,
    current_user = Depends(get_current_user),
    db = Depends(get_db)
):
    expense = db.query(Expense).filter(
        Expense.id == id
    ).first()

    if expense is None:
        raise HTTPException(
            status_code=404,
            detail="Not Found"
        )
    
    if expense.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Forbidden"
        )
    
    db.delete(expense)
    db.commit()

    cache_key = f"expense:summary:user:{current_user.id}"
    await redis_client.delete(cache_key)

    return {"message" : "Expense deleted successfully"}

@router.get("/expenses/sorted")
# GET /expenses/sorted?sort_by=amount&order_by=asc
def by_sorting(
    sort_by: str | None = None,
    order_by: str = "asc",
    db = Depends(get_db),
    current_user = Depends(get_current_user),
):
    query = db.query(Expense).filter(
        Expense.user_id == current_user.id
    )
    if sort_by != "amount" and sort_by != "date":
        raise HTTPException(
            status_code=400,
            detail="Invalid sort_by value. Must be 'amount' or 'date'."
        )
    
    if sort_by == "amount":
        if order_by and order_by.lower() == "desc":
            query = query.order_by(Expense.amount.desc())
        else:
            query = query.order_by(Expense.amount)
    elif sort_by == "date":
        if order_by and order_by.lower() == "desc":
            query = query.order_by(Expense.expense_date.desc())
        else:
            query = query.order_by(Expense.expense_date)

    expenses = query.all()
    return expenses

