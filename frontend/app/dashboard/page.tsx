"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { fadeUp, staggerContainer } from "@/lib/animations"
import { getApplications, ApplicationRecord } from "@/lib/api"
import { Clock, CheckCircle2, AlertCircle, XCircle, RefreshCw, LayoutDashboard } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [applications, setApplications] = useState<ApplicationRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchApps = async () => {
    setIsLoading(true)
    try {
      const data = await getApplications()
      setApplications(data.reverse()) // Show latest first
    } catch (error) {
      console.error("Failed to fetch applications", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchApps()
  }, [])

  return (
    <Section className="min-h-screen pt-12">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <motion.h1 variants={fadeUp} className="text-4xl font-bold font-heading mb-4">
                Application <span className="text-[#F1E194]">Dashboard</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-gray-400">
                Track and manage your credit evaluation history.
              </motion.p>
            </div>
            <motion.div variants={fadeUp}>
              <Button onClick={fetchApps} size="sm" variant="secondary" className="gap-2">
                <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
                Refresh
              </Button>
            </motion.div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 rounded-2xl bg-white/5 border border-white/5 animate-pulse" />
              ))}
            </div>
          ) : applications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applications.map((app) => (
                <motion.div key={app.application_id} variants={fadeUp}>
                  <Card className="p-6 border-white/5 bg-white/5 backdrop-blur-sm hover:border-[#F1E194]/20 transition-all group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-2 rounded-lg bg-white/5 text-[#F1E194]">
                        <Clock size={20} />
                      </div>
                      <Badge 
                        variant={
                          app.decision === "Approved" ? "success" : 
                          app.decision === "Manual Review" ? "warning" : "error"
                        }
                      >
                        {app.decision}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Loan Amount</span>
                        <span className="text-lg font-bold text-white">${app.LoanAmount}k</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Approval Prob.</span>
                        <span className="text-sm font-medium text-white">{(app.approval_probability * 100).toFixed(1)}%</span>
                      </div>
                      
                      <div className="pt-4 border-t border-white/5">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-1">Risk Score</p>
                            <p className="text-sm font-bold text-white">{app.risk_score.toFixed(1)}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-1">Fraud Score</p>
                            <p className="text-sm font-bold text-white">{app.fraud_score}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div variants={fadeUp} className="text-center py-20">
              <Card className="max-w-md mx-auto p-12 border-dashed border-white/10 bg-transparent">
                <p className="text-gray-500 mb-8">No applications found.</p>
                <Link href="/apply">
                  <Button>Start First Application</Button>
                </Link>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </Container>
    </Section>
  )
}
