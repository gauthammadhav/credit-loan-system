def calculate_fraud_score(data: dict) -> int:
    score = 0
    
    loan_amount = data.get("LoanAmount", 0)
    total_income = data.get("ApplicantIncome", 0) + data.get("CoapplicantIncome", 0)
    credit_history = data.get("Credit_History", 1)
    
    loan_amount_term = data.get("Loan_Amount_Term", 1)
    if loan_amount_term == 0:
        loan_amount_term = 1
        
    emi_estimate = loan_amount / loan_amount_term
    debt_to_income_ratio = emi_estimate / total_income if total_income > 0 else 0
    
    # Rules:
    # If LoanAmount > 5 × total income -> +20 fraud score
    if loan_amount > 5 * total_income:
        score += 20
        
    # If Credit_History == 0 -> +25 fraud score
    if credit_history == 0:
        score += 25
        
    # If Debt_to_Income_Ratio > 0.5 -> +20 fraud score
    if debt_to_income_ratio > 0.5:
        score += 20
        
    return score
