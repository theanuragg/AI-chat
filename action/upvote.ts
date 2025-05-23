'use server'

import axios from 'axios'

export const downvote = async (id: string) => {
  try {
    const response = await axios.post(
      `${process.env.BACKEND_URL}/api/dislike`,
      {
        battleId: id,
      }
    )
    return response.data
  } catch (error: unknown) {
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