# AI-Powered Credit Loan Approval & Fraud Detection System
## Phase 1: ML Training Module (Offline Only)

---

# 1. Objective

Build and train:

1. Loan Approval Prediction Models:
   - Logistic Regression (baseline)
   - Random Forest (primary model)

2. Fraud Detection System:
   - Rule-based fraud scoring
   - Isolation Forest anomaly detection

Models must be trained offline and saved as `.pkl` files.
No retraining inside API.

---

# 2. Dataset Information

Rows: 500  
Target column: Loan_Status  

Columns:

- Loan_ID (ignore)
- Gender
- Married
- Dependents
- Education
- Self_Employed
- ApplicantIncome
- CoapplicantIncome
- LoanAmount
- Loan_Amount_Term
- Credit_History
- Property_Area
- Loan_Status

Loan_Status:
- Y → 1
- N → 0

---

# 3. Feature Engineering (Mandatory)

## 3.1 Financial Features

Total_Income:
ApplicantIncome + CoapplicantIncome

EMI_Estimate:
LoanAmount / Loan_Amount_Term

Debt_to_Income_Ratio (DTI):
EMI_Estimate / Total_Income

Loan_to_Income_Ratio:
LoanAmount / (Total_Income * Loan_Amount_Term)

---

## 3.2 Simulated CIBIL Score

Generate Base_CIBIL:

If Credit_History == 1:
    random integer between 700 and 850
Else:
    random integer between 400 and 650

Adjusted_CIBIL:
Initially equal to Base_CIBIL

---

# 4. Data Preprocessing

## 4.1 Missing Values

- LoanAmount → median
- Loan_Amount_Term → median
- Credit_History → mode
- Categorical columns → mode

---

## 4.2 Encoding

Encode categorical features using:
- OneHotEncoding (preferred)

Ensure feature column consistency for inference.
Save feature column names.

---

## 4.3 Scaling

Use StandardScaler on numeric features:

- ApplicantIncome
- CoapplicantIncome
- LoanAmount
- Total_Income
- EMI_Estimate
- Debt_to_Income_Ratio
- Loan_to_Income_Ratio
- Base_CIBIL
- Adjusted_CIBIL

Save scaler as:
scaler.pkl

---

# 5. Model 1: Logistic Regression (Baseline)

- Train/Test split: 80/20
- random_state = 42

Evaluate:
- Accuracy
- Precision
- Recall
- F1 Score
- ROC-AUC

Print metrics clearly.

---

# 6. Model 2: Random Forest (Primary Model)

Parameters:
- n_estimators = 100
- max_depth = None
- random_state = 42

Evaluate same metrics.
Compare performance with Logistic Regression.

Select model with better ROC-AUC.

---

# 7. Risk Score Logic

For selected model:

approval_probability = model.predict_proba(X)[1]

risk_score = (1 - approval_probability) * 100

Risk score range: 0–100

---

# 8. Fraud Detection System

## 8.1 Rule-Based Fraud Scoring

Initialize fraud_score = 0

Add points:

- If DTI > 0.5 → +20
- If EMI_Estimate > 0.7 * Total_Income → +20
- If Credit_History == 0 → +25
- If LoanAmount > 5 * Total_Income → +15

Cap fraud_score at 100.

---

## 8.2 Isolation Forest

Train IsolationForest using:

- Total_Income
- EMI_Estimate
- Debt_to_Income_Ratio
- LoanAmount
- Credit_History
- Dependents

Parameters:
- contamination = 0.05
- random_state = 42

Output:
- anomaly_flag (1 = anomaly, 0 = normal)

---

## 8.3 Final Fraud Score

final_fraud_score = rule_score + (anomaly_flag * 30)

Normalize between 0–100.

Save fraud model as:
fraud_model.pkl

---

# 9. Model Saving Requirements

Create folder:

models/

Save:

- approval_model.pkl
- fraud_model.pkl
- scaler.pkl
- feature_columns.pkl

---

# 10. Folder Structure

ml_training/
│
├── dataset.csv
├── train_models.py
├── preprocessing.py
├── models/

---

# 11. Constraints

- Use random_state = 42 everywhere
- No dynamic retraining
- Clean modular structure
- Separate preprocessing and training
- Do not add extra features beyond this specification
- Do not include backend or frontend logic
- Production-ready clean Python code only

---

# 12. Success Criteria

- Random Forest accuracy ≥ 75%
- ROC-AUC printed
- Confusion matrix displayed
- No runtime errors
- Models saved correctly