# Stage - 1 Build

FROM python:3.12 AS builder

WORKDIR /app

# Creates Virtual Environment
RUN python -m venv /opt/venv

# Force pip to use Virtual environment
ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt .

# pip directly install inside /opt/venv
RUN pip install --no-cache-dir -r requirements.txt

# Stage - 2 Run stage
FROM python:3.12-slim 

WORKDIR /app

COPY --from=builder /opt/venv /opt/venv

ENV PATH="/opt/venv/bin:$PATH"

COPY . .

# It runs your container as appuser(ordinary user) not as root 
# With limited action
RUN useradd --create-home appuser
USER appuser

CMD [ "uvicorn" , "main:app" , "--host" , "0.0.0.0" , "--port" , "8000" ]



