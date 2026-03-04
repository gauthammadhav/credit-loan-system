from backend.prediction_service import predict_loan
import traceback

payload = {
    "ApplicantIncome": 5000,
    "CoapplicantIncome": 2000,
    "LoanAmount": 150000,
    "Loan_Amount_Term": 360,
    "Credit_History": 1,
    "Dependents": 0,
    "Property_Area": "Urban"
}

try:
    result = predict_loan(payload)
    print("Success:", result)
except Exception as e:
    print("Error occurred:")
    traceback.print_exc()
