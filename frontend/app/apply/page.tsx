"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fadeUp, staggerContainer } from "@/lib/animations"
import { applyForLoan, LoanApplicationData, ApplicationResponse } from "@/lib/api"
import { CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, Loader2 } from "lucide-react"

export default function ApplyPage() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<ApplicationResponse | null>(null)
  const [formData, setFormData] = useState<LoanApplicationData>({
    ApplicantIncome: 5000,
    CoapplicantIncome: 0,
    LoanAmount: 150,
    Loan_Amount_Term: 360,
    Credit_History: 1,
    Dependents: 0,
    Property_Area: "Urban",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "Property_Area" ? value : Number(value),
    }))
  }

  const handleNext = () => setStep((s) => s + 1)
  const handleBack = () => setStep((s) => s - 1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await applyForLoan(formData)
      setResult(response)
      setStep(4) // Result step
    } catch (error) {
      console.error("Submission failed", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Section className="min-h-screen pt-12">
      <Container className="max-w-2xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-8"
        >
          <div className="text-center">
            <motion.h1 variants={fadeUp} className="text-4xl font-bold font-heading mb-4">
              Loan <span className="text-[#F1E194]">Application</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-gray-400">
              Provide your details for instant AI-powered credit evaluation.
            </motion.p>
          </div>

          {!result ? (
            <Card className="p-8 border-white/5 bg-white/5 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1 bg-[#F1E194]" style={{ width: `${(step / 3) * 100}%`, transition: 'width 0.3s ease' }} />
              
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-semibold text-white/90">Identity & Dependents</h3>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="Dependents">Number of Dependents</Label>
                          <Input 
                            id="Dependents" 
                            name="Dependents" 
                            type="number" 
                            value={formData.Dependents} 
                            onChange={handleChange} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="Property_Area">Property Area</Label>
                          <select 
                            id="Property_Area" 
                            name="Property_Area" 
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#F1E194]/20"
                            value={formData.Property_Area} 
                            onChange={handleChange}
                          >
                            <option value="Urban">Urban</option>
                            <option value="Semiurban">Semiurban</option>
                            <option value="Rural">Rural</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-semibold text-white/90">Financial Status</h3>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="ApplicantIncome">Applicant Income ($)</Label>
                          <Input 
                            id="ApplicantIncome" 
                            name="ApplicantIncome" 
                            type="number" 
                            value={formData.ApplicantIncome} 
                            onChange={handleChange} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="CoapplicantIncome">Co-applicant Income ($)</Label>
                          <Input 
                            id="CoapplicantIncome" 
                            name="CoapplicantIncome" 
                            type="number" 
                            value={formData.CoapplicantIncome} 
                            onChange={handleChange} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="Credit_History">Credit History (1 for Good, 0 for Bad)</Label>
                          <Input 
                            id="Credit_History" 
                            name="Credit_History" 
                            type="number" 
                            max="1" 
                            min="0" 
                            value={formData.Credit_History} 
                            onChange={handleChange} 
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-semibold text-white/90">Loan Requirements</h3>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="LoanAmount">Loan Amount (in thousands)</Label>
                          <Input 
                            id="LoanAmount" 
                            name="LoanAmount" 
                            type="number" 
                            value={formData.LoanAmount} 
                            onChange={handleChange} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="Loan_Amount_Term">Loan Term (in days)</Label>
                          <Input 
                            id="Loan_Amount_Term" 
                            name="Loan_Amount_Term" 
                            type="number" 
                            value={formData.Loan_Amount_Term} 
                            onChange={handleChange} 
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between mt-12">
                  {step > 1 ? (
                    <Button type="button" variant="secondary" onClick={handleBack} disabled={isSubmitting}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                  ) : <div />}

                  {step < 3 ? (
                    <Button type="button" onClick={handleNext}>
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitting} className="min-w-[140px]">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : "Submit Application"}
                    </Button>
                  )}
                </div>
              </form>
            </Card>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8"
            >
              <Card className="p-12 border-white/5 bg-white/5 backdrop-blur-md">
                <div className="flex flex-col items-center">
                  {result.decision === "Approved" ? (
                    <div className="h-16 w-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                  ) : result.decision === "Manual Review" ? (
                    <div className="h-16 w-16 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center mb-6">
                      <AlertCircle size={40} />
                    </div>
                  ) : (
                    <div className="h-16 w-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-6">
                      <AlertCircle size={40} />
                    </div>
                  )}

                  <h2 className="text-3xl font-bold mb-2">Decision: {result.decision}</h2>
                  <p className="text-gray-400 mb-8">{result.message}</p>

                  <div className="grid grid-cols-2 gap-8 w-full">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Approval Prob.</p>
                      <p className="text-2xl font-bold text-white">{(result.approval_probability * 100).toFixed(1)}%</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Risk Score</p>
                      <p className="text-2xl font-bold text-white">{result.risk_score.toFixed(1)}</p>
                    </div>
                  </div>

                  <div className="mt-12">
                    <Button onClick={() => window.location.href = '/dashboard'}>
                      View Dashboard
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </Section>
  )
}
