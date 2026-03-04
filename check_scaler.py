import joblib
import pandas as pd
from sklearn.preprocessing import StandardScaler

scaler = joblib.load('ml_training/models/scaler.pkl')
print(f"Scaler expected features count: {scaler.n_features_in_}")
print(f"Scaler feature names: {getattr(scaler, 'feature_names_in_', 'Not available')}")
