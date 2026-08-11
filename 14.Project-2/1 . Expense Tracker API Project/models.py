from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Date,
    ForeignKey,
    Numeric,
    UniqueConstraint
)

from database import Base
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship


# User Model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)

    username = Column(
        String,
        unique=True,
        nullable=False
    )

    password = Column(
        String,
        nullable=False
    )

    email = Column(
        String,
        unique=True,
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        default=func.now()
    )

    reset_token = Column(
    String,
    nullable=True,
    unique=True
)

    reset_token_expires = Column(
    DateTime(timezone=True),
    nullable=True
)


    # One User -> Many Categories
    categories = relationship(
        "Category",
        back_populates="user",
        cascade="all, delete-orphan"
    )


    # One User -> Many Expenses
    expenses = relationship(
        "Expense",
        back_populates="user",
        cascade="all, delete-orphan"
    )



# Category Model
class Category(Base):
    __tablename__ = "categories"

    id = Column(
        Integer,
        primary_key=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )


    name = Column(
        String,
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        default=func.now()
    )


    # Same category name allowed for different users
    # But duplicate category name for same user not allowed
    __table_args__ = (
        UniqueConstraint(
            "name",
            "user_id",
            name="unique_category_per_user"
        ),
    )


    # Relationship
    user = relationship(
        "User",
        back_populates="categories"
    )


    # One Category -> Many Expenses
    expenses = relationship(
        "Expense",
        back_populates="category",
        cascade="all, delete-orphan"
    )



# Expense Model
class Expense(Base):
    __tablename__ = "expenses"

    id = Column(
        Integer,
        primary_key=True
    )

    title = Column(
        String,
        nullable=False
    )

    amount = Column(
        Numeric,
        nullable=False
    )

    description = Column(
        String
    )

    expense_date = Column(
        Date,
        nullable=False
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )

    category_id = Column(
        Integer,
        ForeignKey("categories.id", ondelete="CASCADE"),
        nullable=False
    )

    created_at = Column(
        DateTime(timezone=True),
        default=func.now()
    )


    # Relationships

    user = relationship(
        "User",
        back_populates="expenses"
    )


    category = relationship(
        "Category",
        back_populates="expenses"
    )