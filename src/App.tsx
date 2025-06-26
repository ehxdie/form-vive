import React, { useState } from "react";
import Step1Form from "./components/step1Form";
import Step2Feedback from "./components/step2Feedback";
import { generateFeedback } from "./utils/generateFeedback";
import { AnimatePresence, motion } from "framer-motion";

type Persona = "enthusiastic" | "skeptical" | "professional";

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>(null);
  const [feedback, setFeedback] = useState("");
  const [persona, setPersona] = useState<Persona>("enthusiastic");

  const personas: Persona[] = ["enthusiastic", "skeptical", "professional"];

  const handleFormSubmit = (data: any) => {
    // Pick a random persona
    const randomPersona = personas[Math.floor(Math.random() * personas.length)];
    setPersona(randomPersona);
    setFormData(data);
    const generated = generateFeedback(data, randomPersona);
    setFeedback(generated);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4 }}
            >
              <Step1Form onSubmit={handleFormSubmit} />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
            >
              <Step2Feedback
                data={formData}
                persona={persona}
                feedback={feedback}
                onBack={() => setStep(1)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;