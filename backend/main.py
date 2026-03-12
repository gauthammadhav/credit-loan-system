from fastapi import FastAPI, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from backend.prediction_service import predict_loan
from backend.fraud_engine import calculate_fraud_score
from backend.database import get_db, engine, Base
from backend.crud import create_application, save_prediction_result

# Try to create database tables if they don't exist
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"Warning: Could not connect to the database to create tables. Ensure PostgreSQL is running. Error: {e}")

app = FastAPI()

class LoanRequest(BaseModel):
    ApplicantIncome: float
    CoapplicantIncome: float
    LoanAmount: float
    Loan_Amount_Term: float
    Credit_History: float
    Dependents: float
    Property_Area: str

class LoanApplicationRequest(BaseModel):
    ApplicantIncome: float
    CoapplicantIncome: float
    LoanAmount: float
    Loan_Amount_Term: float
    Credit_History: float
    Dependents: float
    Property_Area: str

@app.get("/")
def read_root():
    return "Loan Prediction API running"

@app.post("/predict-loan")
def predict_loan_endpoint(request: LoanRequest):
    data = request.dict()
    
    # Call prediction_service
    approval_probability = predict_loan(data)
    
    # Call fraud engine
    fraud_score = calculate_fraud_score(data)
    
    # Compute risk score
    risk_score = (1 - approval_probability) * 100
    
    return {
        "approval_probability": approval_probability,
        "risk_score": risk_score,
        "fraud_score": fraud_score
    }

@app.post("/apply-loan")
def apply_loan_endpoint(request: LoanApplicationRequest, db: Session = Depends(get_db)):
    data = request.dict()
    
    # 1 & 2. Prediction
    approval_probability = predict_loan(data)
    
    # 3. Fraud detection
    fraud_score = calculate_fraud_score(data)
    
    # 4. Risk score calculation
    risk_score = (1 - approval_probability) * 100
    
    # 5. Determine decision
    if risk_score < 30:
        decision = "Approved"
    elif risk_score < 60:
        decision = "Manual Review"
    else:
        decision = "Rejected"
        
    # 6. Save application to database
    # Passing user_id as None since there is no authentication in this endpoint yet
    db_application = create_application(db, user_id=None, application_data=data)
    db_application = save_prediction_result(
        db,
        application_id=db_application.application_id,
        approval_prob=approval_probability,
        risk_score=risk_score,
        fraud_score=fraud_score,
        decision=decision
    )
    
    # 7. Return response
    return {
        "application_id": db_application.application_id,
        "approval_probability": approval_probability,
        "fraud_score": fraud_score,
        "risk_score": risk_score,
        "decision": decision,
        "message": "Loan application submitted successfully"
    }
