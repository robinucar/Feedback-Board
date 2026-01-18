import { render, screen, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, it, expect, vi } from "vitest"
import { FeedbackCreatePage } from "../pages/FeedbackCreatePage"

// navigate mock
const navigateMock = vi.fn()

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom",
  )

  return {
    ...actual,
    useNavigate: () => navigateMock,
  }
})

// types for mutation
type CreateFeedbackInput = {
  title: string
  message: string
}

type MutationOptions = {
  onSuccess: () => void
  onError?: () => void
}

// trpc mock
const mutateMock = vi.fn()

vi.mock("../lib/trpc", () => ({
  trpc: {
    feedback: {
      create: {
        useMutation: (opts: MutationOptions) => ({
          isPending: false,
          mutate: (values: CreateFeedbackInput) => {
            mutateMock(values)
            opts.onSuccess()
          },
        }),
      },
    },
    useUtils: () => ({
      feedback: {
        list: {
          invalidate: vi.fn(),
        },
      },
    }),
  },
}))

describe("FeedbackCreatePage", () => {
  it("submits form and navigates to list on success", () => {
    render(
      <MemoryRouter>
        <FeedbackCreatePage />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Test title" },
    })

    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "Test message" },
    })

    fireEvent.click(screen.getByRole("button", { name: "Create" }))

    expect(mutateMock).toHaveBeenCalledWith({
      title: "Test title",
      message: "Test message",
    })

    expect(navigateMock).toHaveBeenCalledWith("/")
  })
})
