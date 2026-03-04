import os
import pickle
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, IsolationForest
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix
from preprocessing import preprocess_data

def evaluate_model(name, model, X_test, y_test):
    y_pred = model.predict(X_test)
    y_prob = model.predict_proba(X_test)[:, 1]
    
    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred)
    rec = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    roc_auc = roc_auc_score(y_test, y_prob)
    
    print(f"--- {name} Performance ---")
    print(f"Accuracy:  {acc:.4f}")
    print(f"Precision: {prec:.4f}")
    print(f"Recall:    {rec:.4f}")
    print(f"F1 Score:  {f1:.4f}")
    print(f"ROC-AUC:   {roc_auc:.4f}")
    print(f"Confusion Matrix:\n{confusion_matrix(y_test, y_pred)}\n")
    
    return roc_auc

def build_fraud_model(X_train):
    iso_cols = [
        'Total_Income', 'EMI_Estimate', 'Debt_to_Income_Ratio', 
        'LoanAmount', 'Credit_History', 'Dependents'
    ]
    # Filter only the required features for Isolation Forest
    X_iso = X_train[iso_cols]
    
    iso_forest = IsolationForest(contamination=0.05, random_state=42)
    iso_forest.fit(X_iso)
    
    return iso_forest

def main():
    # Set working directory to the script's directory to resolve relative paths correctly
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    # 9. Model Saving Requirements -> Create models folder
    os.makedirs('models', exist_ok=True)
    print("Starting ML Training Pipeline...\n")
    
    # 4. Preprocess Data
    X, y, scaler = preprocess_data('dataset.csv')
    
    # Save feature column names natively for inference consistency
    with open('models/feature_columns.pkl', 'wb') as f:
        pickle.dump(list(X.columns), f)
        
    with open('models/scaler.pkl', 'wb') as f:
        pickle.dump(scaler, f)
        
    # Train/Test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # 5. Model 1: Logistic Regression
    lr = LogisticRegression(random_state=42, max_iter=1000)
    lr.fit(X_train, y_train)
    lr_roc = evaluate_model("Logistic Regression", lr, X_test, y_test)
    
    # 6. Model 2: Random Forest
    rf = RandomForestClassifier(n_estimators=100, max_depth=None, random_state=42)
    rf.fit(X_train, y_train)
    rf_roc = evaluate_model("Random Forest", rf, X_test, y_test)
    
    # Model Selection Strategy
    if rf_roc >= lr_roc:
        print("Selecting Random Forest (Better ROC-AUC).\n")
        best_model = rf
    else:
        print("Selecting Logistic Regression (Better ROC-AUC).\n")
        best_model = lr
        
    # Save Approval Prediction Model
    with open('models/approval_model.pkl', 'wb') as f:
        pickle.dump(best_model, f)
        
    # 8. Fraud Detection System
    print("Training Fraud Detection System (Isolation Forest)...")
    fraud_model = build_fraud_model(X_train)
    
    # Save Fraud Model
    with open('models/fraud_model.pkl', 'wb') as f:
        pickle.dump(fraud_model, f)
        
    print("Pipeline completed successfully! Models saved to 'models/' directory.")

if __name__ == '__main__':
    main()
