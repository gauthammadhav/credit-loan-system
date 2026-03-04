import urllib.request
import json

url = "http://127.0.0.1:8000/predict-loan"
payload = {
    "ApplicantIncome": 5000,
    "CoapplicantIncome": 2000,
    "LoanAmount": 150000,
    "Loan_Amount_Term": 360,
    "Credit_History": 1,
    "Dependents": 0,
    "Property_Area": "Urban"
}

data = json.dumps(payload).encode('utf-8')
req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})

try:
    with urllib.request.urlopen(req) as response:
        print("Status Code:", response.getcode())
        print(response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print("Error:", e.code)
    print(e.read().decode('utf-8'))
