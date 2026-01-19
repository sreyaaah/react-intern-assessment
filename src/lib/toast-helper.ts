import { toast as originalToast } from "@/components/ui/use-toast"

type ToastProps = Parameters<typeof originalToast>[0]

export const toast = (props: ToastProps) => {
    const { id, dismiss, update } = originalToast(props)

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
        dismiss()
    }, 3000)

    return { id, dismiss, update }
}
