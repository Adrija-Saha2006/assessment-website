import { useEffect, useRef } from 'react'

// Modal confirmation built on the native <dialog> element, which handles
// focus trapping, Escape to close and inert background for us.
export default function ConfirmDialog({ open, title, children, confirmLabel, cancelLabel = 'Cancel', onConfirm, onCancel }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby="confirm-title"
      onCancel={(e) => {
        e.preventDefault()
        onCancel()
      }}
      onClick={(e) => {
        if (e.target === ref.current) onCancel()
      }}
      className="m-auto w-[calc(100%-2.5rem)] max-w-[520px] border border-line-strong bg-ink p-0 text-paper"
    >
      <div className="p-7 sm:p-9">
        <h2 id="confirm-title" className="font-serif text-[34px] leading-[1.05] tracking-[-0.01em]">
          {title}
        </h2>
        <div className="mt-4 text-[15px] leading-relaxed text-mist">{children}</div>
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            autoFocus
            onClick={onCancel}
            className="h-12 border border-line-strong px-6 text-[15px] hover:border-paper"
          >
            {cancelLabel}
          </button>
          <button type="button" onClick={onConfirm} className="h-12 bg-paper px-6 text-[15px] text-ink hover:bg-white/85">
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  )
}
