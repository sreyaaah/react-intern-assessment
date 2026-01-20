import { useForm, useFieldArray } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { useRecipeStore } from "@/store/recipes"
import { toast } from "@/lib/toast-helper"

const ingredientSchema = z.object({
    name: z.string().min(1, "Ingredient name is required"),
    quantity: z.coerce.number().min(0.01, "Quantity must be greater than 0"),
    unit: z.enum(["mg", "l", "ml", "nos"])
})

const recipeSchema = z.object({
    name: z.string().min(1, "Recipe name is required").max(100, "Recipe name is too long"),
    description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description is too long"),
    ingredients: z.array(ingredientSchema).min(1, "At least one ingredient is required")
})

type RecipeFormValues = z.infer<typeof recipeSchema>

export default function CreateForm() {
    const navigate = useNavigate()
    const addRecipe = useRecipeStore(state => state.addRecipe)

    const form = useForm<RecipeFormValues>({
        resolver: zodResolver(recipeSchema) as any,
        defaultValues: {
            name: "",
            description: "",
            ingredients: [{ name: "", quantity: "" as any, unit: "nos" }]
        },
    })

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "ingredients"
    })

    const handleSubmit = (values: RecipeFormValues) => {
        const newRecipe = {
            id: Date.now().toString(),
            title: values.name,
            description: values.description,
            ingredients: values.ingredients,
            archived: false
        }

        addRecipe(newRecipe)

        toast({
            title: "Success!",
            description: "Recipe created successfully",
            variant: "success"
        })

        form.reset()
        
        form.reset()
        navigate("/")
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6 max-w-2xl mt-4"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Recipe Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter recipe name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea 
                                    placeholder="Enter description" 
                                    rows={4}
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <FormLabel>Ingredients</FormLabel>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => append({ name: "", quantity: 0, unit: "nos" })}
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Ingredient
                        </Button>
                    </div>

                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 items-start">
                            <FormField
                                control={form.control}
                                name={`ingredients.${index}.name`}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input placeholder="Ingredient name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`ingredients.${index}.quantity`}
                                render={({ field }) => (
                                    <FormItem className="w-24">
                                        <FormControl>
                                            <Input 
                                                type="number" 
                                                placeholder="Qty" 
                                                step="0.01"
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`ingredients.${index}.unit`}
                                render={({ field }) => (
                                    <FormItem className="w-24">
                                        <FormControl>
                                            <select 
                                                {...field}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                            >
                                                <option value="nos">nos</option>
                                                <option value="mg">mg</option>
                                                <option value="ml">ml</option>
                                                <option value="l">l</option>
                                            </select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => remove(index)}
                                disabled={fields.length === 1}
                                className="mt-0"
                            >
                                <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                        </div>
                    ))}
                    {form.formState.errors.ingredients?.root && (
                        <p className="text-sm text-red-500">{form.formState.errors.ingredients.root.message}</p>
                    )}
                </div>

                <div className="flex gap-3">
                    <Button type="submit">Create Recipe</Button>
                    <Button type="button" variant="outline" onClick={() => navigate("/")}>
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    )
}
