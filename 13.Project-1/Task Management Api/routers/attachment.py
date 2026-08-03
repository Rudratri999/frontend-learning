from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
import cloudinary.uploader

import core.cloudinary  # loads cloudinary config

from database import get_db
from models import Attachment, Task
from schemas import AttachmentResponse


router = APIRouter(
    tags=["Attachments"]
)


@router.post(
    "/tasks/{task_id}/attachments",
    response_model=AttachmentResponse
)
def upload_attachment(
    task_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    task = db.query(Task).filter(
        Task.id == task_id
    ).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if not file.filename:
        raise HTTPException(status_code=400, detail="No file selected")

    try:
        result = cloudinary.uploader.upload(
            file.file,
            resource_type="auto"
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Cloudinary upload failed: {str(exc)}") from exc

    attachment = Attachment(
    filename=file.filename,
    file_url=result["secure_url"],
    public_id=result["public_id"],
    file_type=file.content_type,
    task_id=task_id
)
    db.add(attachment)
    db.commit()
    db.refresh(attachment)

    return attachment

@router.get(
    "/tasks/{task_id}/attachments",
    response_model=list[AttachmentResponse]
)
def get_attachments(
    task_id: int,
    db: Session = Depends(get_db)
):

    attachments = db.query(Attachment).filter(
        Attachment.task_id == task_id
    ).all()

    return attachments



from fastapi import status


@router.delete("/attachments/{attachment_id}")
def delete_attachment(
    attachment_id: int,
    db: Session = Depends(get_db)
):

    attachment = db.query(Attachment).filter(
        Attachment.id == attachment_id
    ).first()


    if not attachment:
        raise HTTPException(
            status_code=404,
            detail="Attachment not found"
        )


    try:
        if getattr(attachment, "public_id", None):
            cloudinary.uploader.destroy(attachment.public_id)
    except Exception:
        pass

    db.delete(attachment)
    db.commit()

    return {
        "message": "Attachment deleted successfully"
    }