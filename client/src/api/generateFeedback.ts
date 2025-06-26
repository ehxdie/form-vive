import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL as string;

export interface FeedbackRequest {
    productName: string;
    problem: string;
    audience: string;
}

export interface FeedbackResponse {
    response: string;
    persona: "enthusiastic" | "skeptical" | "professional";
}

export const generateFeedback = async (
    data: FeedbackRequest
): Promise<FeedbackResponse> => {
    const res = await axios.post<FeedbackResponse>(API_URL, data, {
        headers: { "Content-Type": "application/json" },
    });
    return res.data;
};