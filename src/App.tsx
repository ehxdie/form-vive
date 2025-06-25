import React, { useState } from "react";
import Step1Form from "./components/step1Form";
import Step2Feedback from "./components/step2Feedback";

type Persona = "enthusiastic" | "skeptical" | "professional";

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>(null);
  const [feedback, setFeedback] = useState("");
  const [persona, setPersona] = useState<Persona>("enthusiastic");

  const generateFeedback = (data: any, persona: Persona) => {
    const { productName, problem } = data;

    switch (persona) {
      case "enthusiastic":
        return `OMG! ${productName} is exactly what I needed! Solving "${problem}"? Genius! 😍`;
      case "skeptical":
        return `Hmm, I'm not convinced ${productName} really addresses "${problem}". What makes it different?`;
      case "professional":
        return `From a practical standpoint, ${productName} targets "${problem}", which is a real issue. The approach is interesting and worth exploring further.`;
      default:
        return `Thanks for sharing ${productName}.`;
    }
  };

  const handleFormSubmit = (data: any) => {
    setFormData(data);
    const generated = generateFeedback(data, persona);
    setFeedback(generated);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-2xl">
        {step === 1 && (
          <Step1Form onSubmit={handleFormSubmit} />
        )}
        {step === 2 && (
          <Step2Feedback
            data={formData}
            persona={persona}
            feedback={feedback}
            onBack={() => setStep(1)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
