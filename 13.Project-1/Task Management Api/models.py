from datetime import datetime

from sqlalchemy import Column, Integer, String , DateTime , Date , ForeignKey , Numeric
from database import Base
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

 # imp : you can not create relationship without any foreign key rleated to the particular table

class User(Base) :
     __tablename__ = "users"

     id = Column(Integer , primary_key=True)
     username = Column(String , unique=True , nullable=False)
     password = Column(String , nullable=False)

     projects = relationship('Project' , back_populates='user' , cascade='all ,delete-orphan' )
     

class Project(Base) :
     __tablename__ = "projects"

     id = Column(Integer , primary_key=True)
     name = Column(String , nullable=False)
     description = Column(String ,nullable=False)
     user_id = Column(Integer , ForeignKey('users.id' , ondelete='CASCADE') , nullable=False)
     created_at  = Column(DateTime(timezone = True) , default=func.now())

     user = relationship('User' , back_populates='projects')
     tasks = relationship('Task' , back_populates='project' , cascade='all ,delete-orphan')


class Task(Base) :
     __tablename__ = "tasks"

     id = Column(Integer , primary_key=True)
     title = Column(String , nullable=False)
     description = Column(String , nullable=False)
     status = Column(String, default="Pending")
     project_id = Column(Integer , ForeignKey('projects.id' , ondelete='CASCADE') , nullable=False)
     priority = Column(String , nullable=False)
     due_date = Column(Date , nullable=False)
     created_at  = Column(DateTime(timezone = True) , default=func.now())

     project = relationship('Project' , back_populates='tasks')
     attachments = relationship(
        "Attachment",
        back_populates="task",
        cascade="all, delete-orphan"
    )
     

class Attachment(Base):
    __tablename__ = "attachment"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String, nullable=False)
    file_url = Column(String, nullable=False)
    public_id = Column(String, nullable=False)   # add this
    file_type = Column(String)

    uploaded_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    task_id = Column(
        Integer,
        ForeignKey("tasks.id", ondelete="CASCADE"),
        nullable=False
    )

    task = relationship(
        "Task",
        back_populates="attachments"
    )