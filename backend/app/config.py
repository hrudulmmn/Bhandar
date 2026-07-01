from dotenv import load_dotenv
import os

load_dotenv()
JWT_TEMPLATE=os.getenv("JWT_TEMPLATE")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")
JWT_EXPIRE = os.getenv("JWT_EXPIRE")
DATABASE_URL = os.getenv("DATABASE_URL")