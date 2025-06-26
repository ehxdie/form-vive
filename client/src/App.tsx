import React, { useState } from "react";
import Step1Form from "./components/step1Form";
import Step2Feedback from "./components/step2Feedback";
import { generateFeedback, FeedbackRequest, FeedbackResponse } from "./api/generateFeedback";
import { AnimatePresence, motion } from "framer-motion";

type Persona = "enthusiastic" | "skeptical" | "professional";

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>(null);
  const [feedback, setFeedback] = useState("");
  const [persona, setPersona] = useState<Persona>("enthusiastic");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: FeedbackRequest) => {
    setLoading(true);
    setError(null);
    try {
      setFormData(data);
      const result: FeedbackResponse = await generateFeedback(data);
      setFeedback(result.response);
      setPersona(result.persona);
      setStep(2);
    } catch (err) {
      setError("Failed to generate feedback. Please try again.");
    } finally {
      setLoading(false);
    }
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
              <Step1Form onSubmit={handleFormSubmit} loading={loading} />
              {error && <div className="text-red-500 mt-2">{error}</div>}
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