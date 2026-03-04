import joblib
import os

# Define paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, 'ml_training', 'models')

approval_model_path = os.path.join(MODELS_DIR, 'approval_model.pkl')
fraud_model_path = os.path.join(MODELS_DIR, 'fraud_model.pkl')
scaler_path = os.path.join(MODELS_DIR, 'scaler.pkl')
feature_columns_path = os.path.join(MODELS_DIR, 'feature_columns.pkl')

# Load artifacts
approval_model = joblib.load(approval_model_path)
fraud_model = joblib.load(fraud_model_path)
scaler = joblib.load(scaler_path)
feature_columns = joblib.load(feature_columns_path)
