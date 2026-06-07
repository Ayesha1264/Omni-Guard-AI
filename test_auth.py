from backend.app.database.config import SessionLocal, engine
from backend.app.models.models import User, Base
from werkzeug.security import generate_password_hash
from datetime import datetime

Base.metadata.create_all(bind=engine)

db = SessionLocal()

try:
    hashed_password = generate_password_hash("test123")
    new_user = User(
        username="New Test User",
        email="newtest@test.com",
        password_hash=hashed_password,
        created_at=datetime.utcnow()
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    print("User created successfully!", new_user.id, new_user.username, new_user.email)
except Exception as e:
    print("Error:", e)
finally:
    db.close()
