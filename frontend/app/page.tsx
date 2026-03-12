"use client"

import { motion } from "framer-motion"
import { fadeUp, staggerContainer } from "@/lib/animations"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full overflow-hidden">
      {/* Hero Section */}
      <Section className="relative py-32 lg:py-48 flex items-center justify-center min-h-[80vh]">
        {/* Subtle Background Glows matching the Burgundy/Gold aesthetic */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5B0E14]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-[#F1E194]/5 rounded-full blur-[100px] pointer-events-none" />

        <Container className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center max-w-4xl"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span className="inline-block py-1.5 px-4 rounded-full border border-[#F1E194]/20 bg-[#F1E194]/5 text-[#F1E194] text-sm font-medium tracking-wide">
                Next-Gen Financial Intelligence
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeUp}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8"
            >
              Precision Credit Approval with <span className="text-[#F1E194]">Aura Intelligence</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeUp}
              className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed"
            >
              Leverage advanced machine learning architecture to securely process, evaluate, and conditionally approve credit applications with zero compromise on fraud detection.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">
                Apply for Credit
              </Button>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                View Architecture
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}
