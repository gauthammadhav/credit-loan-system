const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface LoanApplicationData {
  ApplicantIncome: number;
  CoapplicantIncome: number;
  LoanAmount: number;
  Loan_Amount_Term: number;
  Credit_History: number;
  Dependents: number;
  Property_Area: string;
}

export interface ApplicationResponse {
  application_id: number;
  approval_probability: number;
  fraud_score: number;
  risk_score: number;
  decision: string;
  message: string;
}

export interface ApplicationRecord extends LoanApplicationData {
  application_id: number;
  approval_probability: number;
  fraud_score: number;
  risk_score: number;
  decision: string;
}

export async function applyForLoan(data: LoanApplicationData): Promise<ApplicationResponse> {
  const response = await fetch(`${API_BASE_URL}/apply-loan`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to submit loan application');
  }

  return response.json();
}

export async function getApplications(): Promise<ApplicationRecord[]> {
  const response = await fetch(`${API_BASE_URL}/applications`);

  if (!response.ok) {
    throw new Error('Failed to fetch applications');
  }

  return response.json();
}
