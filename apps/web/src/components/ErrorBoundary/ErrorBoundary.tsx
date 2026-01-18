import { Component, type ReactNode } from "react"

type ErrorBoundaryProps = {
  fallback?: ReactNode
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error("UI Error:", error)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold">
              Something went wrong
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Please refresh the page. If the problem continues, try again later.
            </p>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold disabled:opacity-50"
              >
                Refresh
              </button>

              <button
                type="button"
                onClick={() => this.setState({ hasError: false })}
                className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
              >
                Try again
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
