import requests

payload = {
    "ApplicantIncome": 80000, 
    "CoapplicantIncome": 20000, 
    "LoanAmount": 300000, 
    "Loan_Amount_Term": 240, 
    "Credit_History": 1, 
    "Dependents": 1, 
    "Property_Area": "Urban"
}

try:
    response = requests.post("http://127.0.0.1:8000/apply-loan", json=payload)
    print("Status Code:", response.status_code)
    print("Response:", response.text)
except Exception as e:
    print("Failed to request:", e)
