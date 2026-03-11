from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from backend.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String, default="user") # e.g., 'user', 'admin'
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    applications = relationship("LoanApplication", back_populates="user")


class LoanApplication(Base):
    __tablename__ = "loan_applications"

    application_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    # Input Features
    applicant_income = Column(Float)
    coapplicant_income = Column(Float)
    loan_amount = Column(Float)
    loan_term = Column(Float)
    credit_history = Column(Float)
    dependents = Column(Float)
    property_area = Column(String)
    
    # Prediction Results
    approval_probability = Column(Float, nullable=True)
    risk_score = Column(Float, nullable=True)
    fraud_score = Column(Integer, nullable=True)
    decision = Column(String, nullable=True) # e.g., 'Approved', 'Rejected', 'Pending Review'
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    user = relationship("User", back_populates="applications")
    documents = relationship("Document", back_populates="application")


class Document(Base):
    __tablename__ = "documents"

    document_id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("loan_applications.application_id"))
    document_type = Column(String) # e.g., 'ID', 'Payslip', 'Bank Statement'
    file_path = Column(String)
    
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    application = relationship("LoanApplication", back_populates="documents")
