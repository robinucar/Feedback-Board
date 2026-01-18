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
