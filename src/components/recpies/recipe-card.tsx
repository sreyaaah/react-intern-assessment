import { useState } from "react"
import { Trash2, Archive, ArchiveRestore } from "lucide-react"
import { Card, CardDescription, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { ConfirmDialog } from "../confirm-dialog"
import { useRecipeStore } from "@/store/recipes"
import { toast } from "@/lib/toast-helper"

interface RecipieCardProps {
    index: string
    title: string
    description: string
    archived?: boolean
}

export default function RecipieCard({ index, title, description, archived = false }: RecipieCardProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [archiveDialogOpen, setArchiveDialogOpen] = useState(false)
    
    const deleteRecipe = useRecipeStore(state => state.deleteRecipe)
    const archiveRecipe = useRecipeStore(state => state.archiveRecipe)
    const unarchiveRecipe = useRecipeStore(state => state.unarchiveRecipe)

    const handleDelete = () => {
        deleteRecipe(index)
        toast({
            title: "Recipe deleted",
            description: "The recipe has been permanently deleted",
            variant: "success"
        })
    }

    const handleArchiveToggle = () => {
        if (archived) {
            unarchiveRecipe(index)
            toast({
                title: "Recipe unarchived",
                description: "The recipe has been restored",
                variant: "success"
            })
        } else {
            archiveRecipe(index)
            toast({
                title: "Recipe archived",
                description: "The recipe has been moved to archives",
                variant: "success"
            })
        }
    }

    return (
        <>
            <Card className="p-3 hover:cursor-pointer hover:shadow-md transition-shadow relative group" key={index}>
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation()
                            setArchiveDialogOpen(true)
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
                            setDeleteDialogOpen(true)
                        }}
                        className="h-8 w-8 p-0"
                    >
                        <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                </div>
                <CardTitle className="pr-20">{title}</CardTitle>
                <CardDescription className="mt-2">{description}</CardDescription>
            </Card>

            <ConfirmDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                title="Delete Recipe"
                description={`Are you sure you want to delete "${title}"? This action cannot be undone.`}
                onConfirm={handleDelete}
                confirmText="Delete"
                variant="destructive"
            />

            <ConfirmDialog
                open={archiveDialogOpen}
                onOpenChange={setArchiveDialogOpen}
                title={archived ? "Unarchive Recipe" : "Archive Recipe"}
                description={
                    archived
                        ? `Are you sure you want to unarchive "${title}"?`
                        : `Are you sure you want to archive "${title}"?`
                }
                onConfirm={handleArchiveToggle}
                confirmText={archived ? "Unarchive" : "Archive"}
            />
        </>
    )
}