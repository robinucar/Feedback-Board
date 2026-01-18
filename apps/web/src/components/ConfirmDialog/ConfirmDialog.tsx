import { Modal } from "../Modal/Modal"

type ConfirmDialogProps = {
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  isConfirming?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDialog = ({
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isConfirming = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  return (
    <Modal title={title} onClose={onCancel}>
      {description && (
        <p className="mb-4 text-sm text-white/70">
          {description}
        </p>
      )}

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isConfirming}
          className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10 disabled:opacity-50"
        >
          {cancelLabel}
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={isConfirming}
          className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold disabled:opacity-50"
        >
          {isConfirming ? "Deleting..." : confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
