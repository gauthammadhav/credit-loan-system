import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

def feature_engineering(df):
    # Create copies to prevent SettingWithCopyWarning
    df = df.copy()
    
    # Financial Features
    df['Total_Income'] = df['ApplicantIncome'] + df['CoapplicantIncome']
    df['EMI_Estimate'] = df['LoanAmount'] / df['Loan_Amount_Term']
    df['Debt_to_Income_Ratio'] = df['EMI_Estimate'] / df['Total_Income']
    
    # Prevent division by zero just in case
    denominator = df['Total_Income'] * df['Loan_Amount_Term']
    df['Loan_to_Income_Ratio'] = np.where(denominator > 0, df['LoanAmount'] / denominator, 0)
    
    # Base CIBIL Generator
    np.random.seed(42)
    def generate_cibil(ch):
        if ch == 1:
            return np.random.randint(700, 851)
        else:
            return np.random.randint(400, 651)
            
    df['Base_CIBIL'] = df['Credit_History'].apply(generate_cibil)
    df['Adjusted_CIBIL'] = df['Base_CIBIL']
    
    return df

def preprocess_data(csv_path):
    df = pd.read_csv(csv_path)
    
    # Drop Loan_ID
    if 'Loan_ID' in df.columns:
        df = df.drop(columns=['Loan_ID'])
        
    # Map target variable
    if 'Loan_Status' in df.columns:
        df['Loan_Status'] = df['Loan_Status'].map({'Y': 1, 'N': 0})
        
    # Map Dependents to numeric to preserve ordinal value and allow isolation forest to use it cleanly
    if 'Dependents' in df.columns:
        df['Dependents'] = df['Dependents'].astype(str).replace({'0': 0, '1': 1, '2': 2, '3+': 3, 'nan': np.nan}).astype(float)
        
    # Missing values imputation for numerical columns
    num_cols = df.select_dtypes(include=[np.number]).columns
    for col in num_cols:
        if col in df.columns:
            df[col] = df[col].fillna(df[col].median())
            
    # Categorical columns imputation
    cat_cols = df.select_dtypes(include=['object']).columns
    for col in cat_cols:
        if col in df.columns:
            df[col] = df[col].fillna(df[col].mode()[0])
            
    # Also impute Dependents if any nans remain
    if 'Dependents' in df.columns:
        df['Dependents'] = df['Dependents'].fillna(df['Dependents'].mode()[0])
        
    # Feature Engineering
    df = feature_engineering(df)
    
    # Separate features and target
    y = df['Loan_Status']
    X = df.drop(columns=['Loan_Status'])
    
    # Encoding Categorical Variables
    # We use drop_first=True for OneHotEncoding
    X = pd.get_dummies(X, drop_first=True)
    
    # Scaling numeric features
    cols_to_scale = [
        'ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Total_Income', 
        'EMI_Estimate', 'Debt_to_Income_Ratio', 'Loan_to_Income_Ratio', 
        'Base_CIBIL', 'Adjusted_CIBIL'
    ]
    
    scaler = StandardScaler()
    X[cols_to_scale] = scaler.fit_transform(X[cols_to_scale])
    
    return X, y, scaler
