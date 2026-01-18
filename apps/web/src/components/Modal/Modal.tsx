import type { ReactNode } from "react"

type ModalProps = {
  title: string
  children: ReactNode
  onClose: () => void
}

export const Modal = ({ title, children, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-md border border-white/10 bg-slate-900 p-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-white/10 px-3 py-1 text-sm hover:bg-white/15"
            aria-label="Close modal"
          >
            Close
          </button>
        </div>

        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  )
}
