'use client';

import { motion } from 'framer-motion';
import { useCalculatorStore } from '@/store/calculatorStore';
import Step1BasicInfo from './steps/Step1BasicInfo';
import Step2Venue from './steps/Step2Venue';
import Step3Catering from './steps/Step3Catering';
import Step4Vendors from './steps/Step4Vendors';
import Step5Concept from './steps/Step5Concept';
import ResultsPage from './ResultsPage';
import StepIndicator from './StepIndicator';

export default function CalculatorSteps() {
  const { currentStep } = useCalculatorStore();

  const steps = [
    { number: 1, title: 'Informasi Dasar', icon: '👰' },
    { number: 2, title: 'Pilih Venue', icon: '🏛️' },
    { number: 3, title: 'Catering', icon: '🍽️' },
    { number: 4, title: 'Vendor', icon: '✨' },
    { number: 5, title: 'Konsep', icon: '💎' },
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo />;
      case 2:
        return <Step2Venue />;
      case 3:
        return <Step3Catering />;
      case 4:
        return <Step4Vendors />;
      case 5:
        return <Step5Concept />;
      case 6:
        return <ResultsPage />;
      default:
        return <Step1BasicInfo />;
    }
  };

  if (currentStep === 6) {
    return renderStep();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-white py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-6">
        {/* Step Indicator */}
        <StepIndicator steps={steps} currentStep={currentStep} />

        {/* Form Container */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mt-12"
        >
          {renderStep()}
        </motion.div>
      </div>
    </div>
  );
}
