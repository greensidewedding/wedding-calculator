'use client';

import { motion } from 'framer-motion';

interface Step {
  number: number;
  title: string;
  icon: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            {/* Step Circle */}
            <motion.div
              className={`relative flex items-center justify-center w-12 h-12 rounded-full font-bold text-sm transition-all duration-300 ${
                currentStep >= step.number
                  ? 'bg-sage text-white shadow-lg'
                  : 'bg-gray-200 text-gray-600'
              }`}
              animate={currentStep === step.number ? { scale: 1.1 } : { scale: 1 }}
            >
              <span>{step.icon}</span>
            </motion.div>

            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-2 bg-gray-200 rounded-full">
                <motion.div
                  className="h-full bg-sage rounded-full"
                  initial={{ width: '0%' }}
                  animate={{
                    width: currentStep > step.number ? '100%' : '0%',
                  }}
                  transition={{ duration: 0.5 }}
                ></motion.div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex justify-between mt-4 text-center">
        {steps.map((step) => (
          <div key={step.number} className="flex-1">
            <p className="text-xs md:text-sm font-medium text-gray-700 hidden sm:block">
              {step.title}
            </p>
            <p className="text-xs md:text-sm font-medium text-gray-700 sm:hidden">
              Step {step.number}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
