import RecipeList from "@/components/recpies/recipe-list"

export default function Archive() {
    return <div className="flex justify-center p-6">
        <RecipeList showArchived={true} />
    </div>
}

