import { Trash2, Archive, ArchiveRestore } from "lucide-react"
import { Card, CardDescription, CardTitle } from "../ui/card"
import { Button } from "../ui/button"

interface RecipieCardProps {
  title: string
  description: string
  archived?: boolean
  onDeleteClick: () => void
  onArchiveClick: () => void
}

export default function RecipieCard({
  title,
  description,
  archived = false,
  onDeleteClick,
  onArchiveClick,
}: RecipieCardProps) {
  return (
    <Card className="
      relative group overflow-hidden
      min-h-[220px] p-5
      bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50
      border border-orange-100
      transition-all duration-300
      hover:shadow-xl hover:-translate-y-1
    ">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400" />
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
          onClick={(e) => {
            e.stopPropagation()
            onArchiveClick()
          }}
        >
          {archived ? (
            <ArchiveRestore className="h-4 w-4 text-blue-600" />
          ) : (
            <Archive className="h-4 w-4 text-orange-600" />
          )}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
          onClick={(e) => {
            e.stopPropagation()
            onDeleteClick()
          }}
        >
          <Trash2 className="h-4 w-4 text-red-600" />
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        <CardTitle className="text-xl font-semibold text-gray-800 pr-20">
          {title}
        </CardTitle>

        <CardDescription className="text-gray-600 leading-relaxed">
          {description}
        </CardDescription>
      </div>
    </Card>
  )
}
