from sqlalchemy.orm import Session
from backend.models import User, LoanApplication, Document

def create_user(db: Session, name: str, email: str, password_hash: str, role: str = "user"):
    db_user = User(
        name=name, 
        email=email, 
        password_hash=password_hash, 
        role=role
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_application(db: Session, user_id: int, application_data: dict):
    db_application = LoanApplication(
        user_id=user_id,
        applicant_income=application_data.get("ApplicantIncome"),
        coapplicant_income=application_data.get("CoapplicantIncome"),
        loan_amount=application_data.get("LoanAmount"),
        loan_term=application_data.get("Loan_Amount_Term"),
        credit_history=application_data.get("Credit_History"),
        dependents=application_data.get("Dependents"),
        property_area=application_data.get("Property_Area")
    )
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    return db_application

def get_application(db: Session, application_id: int):
    return db.query(LoanApplication).filter(LoanApplication.application_id == application_id).first()

def save_prediction_result(db: Session, application_id: int, approval_prob: float, risk_score: float, fraud_score: int, decision: str):
    db_application = db.query(LoanApplication).filter(LoanApplication.application_id == application_id).first()
    if db_application:
        db_application.approval_probability = approval_prob
        db_application.risk_score = risk_score
        db_application.fraud_score = fraud_score
        db_application.decision = decision
        db.commit()
        db.refresh(db_application)
    return db_application

def store_document(db: Session, application_id: int, document_type: str, file_path: str):
    db_document = Document(
        application_id=application_id,
        document_type=document_type,
        file_path=file_path
    )
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document
