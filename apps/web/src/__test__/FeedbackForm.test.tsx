import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { FeedbackForm } from "../components/FeedbackForm/FeedbackForm"

describe("FeedbackForm", () => {
  it("disables submit button when required fields are empty", () => {
    render(
      <FeedbackForm
        initialValues={{ title: "", message: "" }}
        submitLabel="Create"
        isSubmitting={false}
        onSubmit={() => {}}
      />,
    )

    const submitButton = screen.getByRole("button", { name: "Create" })

    expect(submitButton).toBeDisabled()
  })
})
