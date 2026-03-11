import pandas as pd
from backend.models_loader import approval_model, scaler, feature_columns

def predict_loan(data: dict) -> float:
    # 1. Convert input data to pandas DataFrame
    df = pd.DataFrame([data])
    
    # 2. Generate engineered features
    df['Total_Income'] = df['ApplicantIncome'] + df['CoapplicantIncome']
    # Handle Loan_Amount_Term division safely
    term = df['Loan_Amount_Term'].replace(0, 1) # Prevent division by zero
    df['EMI_Estimate'] = df['LoanAmount'] / term
    
    # Handle Total_Income division safely
    total_income = df['Total_Income'].replace(0, 1) # Prevent division by zero
    df['Debt_to_Income_Ratio'] = df['EMI_Estimate'] / total_income
    
    # Missing engineered features for CIBIL and Loan-to-Income from training
    denominator = df['Total_Income'] * df['Loan_Amount_Term']
    df['Loan_to_Income_Ratio'] = [
        amt / den if den > 0 else 0 
        for amt, den in zip(df['LoanAmount'], denominator)
    ]
    
    def get_cibil(ch):
        return 775 if ch == 1 else 525
        
    df['Base_CIBIL'] = df['Credit_History'].apply(get_cibil)
    df['Adjusted_CIBIL'] = df['Base_CIBIL']
    
    # 3. Apply one-hot encoding
    df = pd.get_dummies(df)
    
    # 4. Align features with feature_columns.pkl
    for col in feature_columns:
        if col not in df.columns:
            df[col] = 0
            
    # 5. Scale numeric features using scaler.pkl
    # The scaler was fitted on specific 9 columns
    cols_to_scale = getattr(scaler, 'feature_names_in_', None)
    if cols_to_scale is None:
        cols_to_scale = [
            'ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Total_Income', 
            'EMI_Estimate', 'Debt_to_Income_Ratio', 'Loan_to_Income_Ratio', 
            'Base_CIBIL', 'Adjusted_CIBIL'
        ]
        
    for col in cols_to_scale:
        if col not in df.columns:
            df[col] = 0
            
    df[cols_to_scale] = scaler.transform(df[cols_to_scale])
    
    # Finally, ensure only the required features are present and in the exact order
    df_final = df[feature_columns]
    
    # 6. Run Random Forest model prediction
    probability = approval_model.predict_proba(df_final)[0][1]
    
    return float(probability)
