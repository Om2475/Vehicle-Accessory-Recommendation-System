FROM python:3.11-slim

WORKDIR /app

COPY . .

RUN pip install --upgrade pip
RUN pip install dvc fastapi uvicorn

EXPOSE 8000

CMD ["python","ML_Engine/api.py"]
