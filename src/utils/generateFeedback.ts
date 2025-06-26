type Persona = "enthusiastic" | "skeptical" | "professional";

export const generateFeedback = (
    data: { productName: string; problem: string },
    persona: Persona
) => {
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