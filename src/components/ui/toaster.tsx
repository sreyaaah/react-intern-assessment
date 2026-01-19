import { useToast } from "./use-toast"
import { X } from "lucide-react"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed top-0 right-0 z-50 flex flex-col gap-2 p-4 max-w-md w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            rounded-lg shadow-lg p-4 border animate-in slide-in-from-top-5
            ${toast.variant === "success" ? "bg-green-50 border-green-200" : ""}
            ${toast.variant === "error" ? "bg-red-50 border-red-200" : ""}
            ${!toast.variant || toast.variant === "default" ? "bg-white border-gray-200" : ""}
          `}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              {toast.title && (
                <div className={`font-semibold text-sm mb-1 
                  ${toast.variant === "success" ? "text-green-900" : ""}
                  ${toast.variant === "error" ? "text-red-900" : ""}
                  ${!toast.variant || toast.variant === "default" ? "text-gray-900" : ""}
                `}>
                  {toast.title}
                </div>
              )}
              {toast.description && (
                <div className={`text-sm 
                  ${toast.variant === "success" ? "text-green-700" : ""}
                  ${toast.variant === "error" ? "text-red-700" : ""}
                  ${!toast.variant || toast.variant === "default" ? "text-gray-600" : ""}
                `}>
                  {toast.description}
                </div>
              )}
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
