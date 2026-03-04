from fastapi import FastAPI
from pydantic import BaseModel
from backend.prediction_service import predict_loan
from backend.fraud_engine import calculate_fraud_score

app = FastAPI()

class LoanRequest(BaseModel):
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
