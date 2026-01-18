import { API_BASE_URL } from "./api"

export type Feedback = {
  id: string
  title: string
  message: string
  createdAt: string
}

export const fetchFeedbackList = async (): Promise<Feedback[]> => {
  const res = await fetch(`${API_BASE_URL}/feedback`)

  if (!res.ok) {
    throw new Error("Failed to fetch feedback list")
  }

  return res.json()
}


export type CreateFeedbackInput = {
  title: string
  message: string
}

export const createFeedback = async (
  input: CreateFeedbackInput,
): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/feedback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  })

  if (!res.ok) {
    throw new Error("Failed to create feedback")
  }
}