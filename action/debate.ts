'use server'

import axios from 'axios'
export const debate = async (
    model1: string,
    model2: string,
    topic: string,
    rounds: number = 3
) => {
    try{
        if (!model1 || !model2) {
            throw new Error("Both models must be specified")
        }
        if (!topic) {
            throw new Error("Enter a valid topic to debate!")
        }
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/battle-chat`,
            {
                model1,
                model2,
                topic,
                rounds,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        if (!response || !response.data || !response.data.success) {
            throw new Error("Invalid response from server")
        }  

        return response.data.data     
    }
    catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.error("Server error:", error.response.data);
                throw new Error(error.response.data.error || "Server error occurred");
            } else if (error.request) {
                console.error("Network error:", error.request);
                throw new Error("Network error. Please check your connection.");
            }
        }
        console.error("Unexpected error:", error);
        throw new Error("An unexpected error occurred.");
    }


}