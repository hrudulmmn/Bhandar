from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine(DATABASE_URL)

session = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit = False
)

Base = declarative_base()

def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()
