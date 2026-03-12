// Reusable Framer Motion animation presets
import { Variants, TargetAndTransition } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] // Custom ease-out
    }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Intended for whileHover properties mostly
export const scaleHover: TargetAndTransition = {
  scale: 1.02,
  transition: {
    duration: 0.2,
    ease: "easeInOut"
  }
};

// Soft lift for premium cards
export const liftHover: TargetAndTransition = {
  y: -4,
  boxShadow: "0 10px 30px -10px rgba(241, 225, 148, 0.05)",
  transition: {
    duration: 0.3,
    ease: "easeOut"
  }
};

// Sequence stagger children
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
