import { type IngredientType, type RecipeType, useRecipeStore } from "@/store/recipes"
import { useEffect, useState, type JSX } from "react"
import { DialogContent, DialogDescription, DialogTitle } from "../ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

interface RecipeInfoProps {
  id: string
}

interface IngredientListProps {
  ingredients: IngredientType[] | undefined
}

function IngredientList({ ingredients }: IngredientListProps): JSX.Element {
  return (
    <div className="mt-6 rounded-lg border overflow-hidden">
      <Table>
        <TableHeader className="bg-orange-50">
          <TableRow>
            <TableHead className="text-orange-700">Ingredient</TableHead>
            <TableHead className="text-orange-700">Quantity</TableHead>
            <TableHead className="text-orange-700">Unit</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {ingredients?.map((ingredient, index) => (
            <TableRow
              key={ingredient.name}
              className={index % 2 === 0 ? "bg-white" : "bg-orange-50/40"}
            >
              <TableCell className="font-medium">
                {ingredient.name}
              </TableCell>
              <TableCell>{ingredient.quantity}</TableCell>
              <TableCell>{ingredient.unit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {!ingredients?.length && (
        <p className="p-4 text-sm text-gray-500 text-center">
          No ingredients added
        </p>
      )}
    </div>
  )
}

export default function RecipeInfo({ id }: RecipeInfoProps) {
  const [recipe, setRecipe] = useState<RecipeType | undefined>(undefined)
  const findRecpie = useRecipeStore(state => state.findRecipe)

  useEffect(() => {
    setRecipe(findRecpie(id))
  }, [id])

  return (
    <DialogContent className="max-w-2xl p-0 overflow-hidden">
      <div className="bg-gradient-to-r from-orange-100 via-amber-100 to-yellow-100 px-6 py-4">
        <DialogTitle className="text-2xl font-bold text-gray-800">
          {recipe?.title}
        </DialogTitle>
        <DialogDescription className="mt-1 text-gray-600">
          {recipe?.description}
        </DialogDescription>
      </div>
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Ingredients
        </h3>

        <IngredientList ingredients={recipe?.ingredients} />
      </div>
    </DialogContent>
  )
}
