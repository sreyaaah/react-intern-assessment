import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog"
import { Button } from "./ui/button"
import { AlertTriangle } from "lucide-react"

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  onConfirm: () => void
  confirmText?: string
  cancelText?: string
  variant?: "default" | "destructive"
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  const isDestructive = variant === "destructive"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          max-w-md
          rounded-xl
          border border-orange-200
          bg-orange-50
          p-6
        "
      >
        <div className="flex gap-4">
          <div
            className={`
              flex h-10 w-10 items-center justify-center rounded-full
              ${isDestructive ? "bg-red-100" : "bg-orange-100"}
            `}
          >
            <AlertTriangle
              className={`h-5 w-5 ${
                isDestructive ? "text-red-600" : "text-orange-600"
              }`}
            />
          </div>

          <div className="space-y-1">
            <DialogTitle className="text-lg font-semibold text-orange-900">
              {title}
            </DialogTitle>
            <DialogDescription className="text-sm text-orange-800/70">
              {description}
            </DialogDescription>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button
            onClick={() => onOpenChange(false)}
            className="
              bg-transparent
              border border-orange-300
              text-orange-700
              hover:bg-orange-100
            "
          >
            {cancelText}
          </Button>

          <Button
            onClick={handleConfirm}
            className={
              isDestructive
                ? "bg-red-600 hover:bg-red-700"
                : "bg-orange-600 hover:bg-orange-700"
            }
          >
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
