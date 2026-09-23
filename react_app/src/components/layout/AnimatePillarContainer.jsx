import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function AnimatePillarContainer({ children, animationKey, direction = 1, className = "" }) {
  return (
    <div className={`relative overflow-hidden w-full ${className}`}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={animationKey}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
