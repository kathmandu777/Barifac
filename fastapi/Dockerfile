FROM python:3.8.3

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONPATH=/src

WORKDIR /src

RUN pip install poetry
RUN poetry config virtualenvs.in-project true