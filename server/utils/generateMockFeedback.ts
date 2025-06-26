
export const generateMockFeedback = (name: string, problem: string, persona: string) => {
    switch (persona) {
        case "skeptical":
            return `Not sure ${name} really solves "${problem}" effectively. Sounds ambitious.`;
        case "professional":
            return `From a business perspective, ${name} addresses "${problem}" with potential upside.`;
        case "enthusiastic":
        default:
            return `Wow! ${name} is perfect for solving "${problem}". I'm excited!`;
    }
}