import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

# Đọc file .env
load_dotenv()

HOST = os.getenv("DB_HOST")
PORT = os.getenv("DB_PORT")
USER = os.getenv("DB_USER")
PASSWORD = os.getenv("DB_PASSWORD")
DATABASE = os.getenv("DB_NAME")

print(HOST, PORT, USER, PASSWORD, DATABASE)

engine = create_engine(
    f"mysql+pymysql://{USER}:{PASSWORD}@{HOST}:{PORT}/{DATABASE}"
)