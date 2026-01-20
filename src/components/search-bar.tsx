import { Search, X } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search recipes...",
}: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-orange-500" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          pl-10 pr-10
          bg-gradient-to-r from-orange-50 to-amber-50
          border-orange-200
          focus:border-orange-400
          focus:ring-2 focus:ring-orange-300
          transition-all
        "
      />
      {value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange("")}
          className="
            absolute right-2 top-1/2 -translate-y-1/2
            h-7 w-7 p-0
            rounded-full
            text-gray-500
            hover:text-red-600
            hover:bg-red-50
          "
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
