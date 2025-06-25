import React from "react";

interface FeedbackProps {
    data: {
        productName: string;
        problem: string;
        audience: string;
    };
    persona: "enthusiastic" | "skeptical" | "professional";
    feedback: string;
    onBack: () => void;
}

const personaStyles = {
    enthusiastic: {
        title: "🎉 Enthusiastic User",
        color: "text-green-600",
        bg: "bg-green-50",
    },
    skeptical: {
        title: "🤔 Skeptical Reviewer",
        color: "text-yellow-700",
        bg: "bg-yellow-50",
    },
    professional: {
        title: "📊 Professional Analyst",
        color: "text-blue-600",
        bg: "bg-blue-50",
    },
};

const Step2Feedback = ({ data, persona, feedback, onBack }: FeedbackProps) => {
    const style = personaStyles[persona];

    return (
        <div className="max-w-2xl mx-auto mt-16 p-6 bg-white rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Simulated Feedback
            </h2>
            <p className="text-sm text-gray-500 mb-6">
                Based on your input for <span className="font-medium">{data.productName}</span> targeting{" "}
                <span className="font-medium">{data.audience}</span>
            </p>

            <div className={`rounded-lg p-4 ${style.bg} ${style.color}`}>
                <h3 className="font-semibold mb-2">{style.title}</h3>
                <p className="whitespace-pre-wrap leading-relaxed">{feedback}</p>
            </div>

            <div className="mt-8 flex justify-between">
                <button
                    onClick={onBack}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                    ← Back
                </button>
                {/* Optional: retry or change persona buttons */}
            </div>
        </div>
    );
};

export default Step2Feedback;
