import { Navigation } from "./navigation"
import { ChefHat } from "lucide-react"

export function Header() {
  return (
    <header
      className="
        sticky top-0 z-40
        border-b border-orange-200
        bg-orange-50/90 backdrop-blur
      "
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-orange-100 p-2">
              <ChefHat className="h-7 w-7 text-orange-600" />
            </div>

            <h1 className="text-xl sm:text-2xl font-semibold text-orange-900">
              Grandma&apos;s Recipe Book
            </h1>
          </div>
          <Navigation />
        </div>
      </div>
    </header>
  )
}
