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
    onArchiveClick
}: RecipieCardProps) {
    return (
        <Card className="p-3 hover:cursor-pointer hover:shadow-md transition-shadow relative group">
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation()
                        onArchiveClick()
                    }}
                    className="h-8 w-8 p-0"
                >
                    {archived ? (
                        <ArchiveRestore className="h-4 w-4 text-blue-600" />
                    ) : (
                        <Archive className="h-4 w-4 text-gray-600" />
                    )}
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation()
                        onDeleteClick()
                    }}
                    className="h-8 w-8 p-0"
                >
                    <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
            </div>
            <CardTitle className="pr-20">{title}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
        </Card>
    )
}