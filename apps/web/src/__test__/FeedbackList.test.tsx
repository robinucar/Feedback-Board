import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, it, expect, vi } from "vitest"
import { FeedbackListPage } from "../pages/FeedbackListPage"

vi.mock("../lib/trpc", () => ({
  trpc: {
    feedback: {
      list: {
        useQuery: () => ({
          data: [],
          isLoading: false,
          error: null,
        }),
      },
      update: { useMutation: () => ({}) },
      delete: { useMutation: () => ({}) },
    },
    useUtils: () => ({
      feedback: {
        list: {
          invalidate: vi.fn(),
          cancel: vi.fn(),
          getData: vi.fn(),
          setData: vi.fn(),
        },
      },
    }),
  },
}))

describe("FeedbackListPage", () => {
  it("renders empty state when there is no feedback", () => {
    render(
      <MemoryRouter>
        <FeedbackListPage />
      </MemoryRouter>,
    )

    expect(screen.getByText("No feedback yet.")).toBeInTheDocument()
  })
})
