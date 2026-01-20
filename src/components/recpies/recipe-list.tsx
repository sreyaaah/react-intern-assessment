import { useState, useMemo } from "react"
import { useRecipeStore, type RecipeType } from "@/store/recipes"
import RecipieCard from "./recipe-card"
import RecipeInfo from "./recipe-info"
import { Dialog, DialogTrigger } from "../ui/dialog"
import { SearchBar } from "../search-bar"
import { Pagination } from "../pagination"
import { EmptyState } from "../empty-state"
import { ConfirmDialog } from "../confirm-dialog"
import { toast } from "@/lib/toast-helper"
import { CookingPot, Search as SearchIcon } from "lucide-react"

interface RecipeListProps {
    showArchived?: boolean
}

function RecipeItem({ recipe }: { recipe: RecipeType }) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [archiveDialogOpen, setArchiveDialogOpen] = useState(false)
    
    const deleteRecipe = useRecipeStore(state => state.deleteRecipe)
    const archiveRecipe = useRecipeStore(state => state.archiveRecipe)
    const unarchiveRecipe = useRecipeStore(state => state.unarchiveRecipe)

    const handleDelete = () => {
        deleteRecipe(recipe.id)
        toast({
            title: "Recipe deleted",
            description: "The recipe has been permanently deleted",
            variant: "success"
        })
    }

    const handleArchiveToggle = () => {
        if (recipe.archived) {
            unarchiveRecipe(recipe.id)
            toast({
                title: "Recipe unarchived",
                description: "The recipe has been restored",
                variant: "success"
            })
        } else {
            archiveRecipe(recipe.id)
            toast({
                title: "Recipe archived",
                description: "The recipe has been moved to archives",
                variant: "success"
            })
        }
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <div>
                        <RecipieCard
                            title={recipe.title}
                            description={recipe.description}
                            archived={recipe.archived}
                            onDeleteClick={() => setDeleteDialogOpen(true)}
                            onArchiveClick={() => setArchiveDialogOpen(true)}
                        />
                    </div>
                </DialogTrigger>
                <RecipeInfo id={recipe.id} />
            </Dialog>

            <ConfirmDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                title="Delete Recipe"
                description={`Are you sure you want to delete "${recipe.title}"? This action cannot be undone.`}
                onConfirm={handleDelete}
                confirmText="Delete"
                variant="destructive"
            />

            <ConfirmDialog
                open={archiveDialogOpen}
                onOpenChange={setArchiveDialogOpen}
                title={recipe.archived ? "Unarchive Recipe" : "Archive Recipe"}
                description={
                    recipe.archived
                        ? `Are you sure you want to unarchive "${recipe.title}"?`
                        : `Are you sure you want to archive "${recipe.title}"?`
                }
                onConfirm={handleArchiveToggle}
                confirmText={recipe.archived ? "Unarchive" : "Archive"}
            />
        </>
    )
}

export default function RecipeList({ showArchived = false }: RecipeListProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 9

    const recipes = useRecipeStore(state => state.recipes)
    
    const allRecipes = useMemo(() => {
        return showArchived 
            ? recipes.filter(r => r.archived)
            : recipes.filter(r => !r.archived)
    }, [recipes, showArchived])

    const filteredRecipes = useMemo(() => {
        if (!searchQuery.trim()) return allRecipes

        const query = searchQuery.toLowerCase()
        return allRecipes.filter(recipe => {
            const titleMatch = recipe.title.toLowerCase().includes(query)
            const descriptionMatch = recipe.description.toLowerCase().includes(query)
            const ingredientMatch = recipe.ingredients.some(ing =>
                ing.name.toLowerCase().includes(query)
            )
            return titleMatch || descriptionMatch || ingredientMatch
        })
    }, [allRecipes, searchQuery])

    useMemo(() => {
        setCurrentPage(1)
    }, [searchQuery])

    const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedRecipes = filteredRecipes.slice(startIndex, startIndex + itemsPerPage)

    if (allRecipes.length === 0) {
        return (
            <div className="w-full">
                <EmptyState
                    icon={CookingPot}
                    title={showArchived ? "No archived recipes" : "No recipes yet"}
                    description={
                        showArchived
                            ? "You haven't archived any recipes yet. Archive recipes from the home page to see them here."
                            : "Get started by creating your first recipe. Click the 'Create' button in the navigation to add a new recipe."
                    }
                />
            </div>
        )
    }

    return (
        <div className="w-full max-w-6xl">
            <div className="mb-6 flex justify-center">
                <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search recipes by name, description, or ingredients..."
                />
            </div>

            {filteredRecipes.length === 0 ? (
                <EmptyState
                    icon={SearchIcon}
                    title="No recipes found"
                    description={`No recipes match "${searchQuery}". Try a different search term or clear the search.`}
                />
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {paginatedRecipes.map(recipe => (
                            <RecipeItem key={recipe.id} recipe={recipe} />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </div>
    )
}