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
  unit: z.enum(["mg", "l", "ml", "nos"]),
})

const recipeSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(10).max(500),
  ingredients: z.array(ingredientSchema).min(1),
})

type RecipeFormValues = z.infer<typeof recipeSchema>

export default function CreateForm() {
  const navigate = useNavigate()
  const addRecipe = useRecipeStore((state) => state.addRecipe)

  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema) as any,
    defaultValues: {
      name: "",
      description: "",
      ingredients: [{ name: "", quantity: "" as any, unit: "nos" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  })

  const handleSubmit = (values: RecipeFormValues) => {
    addRecipe({
      id: Date.now().toString(),
      title: values.name,
      description: values.description,
      ingredients: values.ingredients,
      archived: false,
    })

    toast({
      title: "Success!",
      description: "Recipe created successfully",
      variant: "success",
    })

    form.reset()
    navigate("/")
  }

  return (
<Form {...form}>
  <form
    onSubmit={form.handleSubmit(handleSubmit)}
    className="
      max-w-xl mt-4 space-y-4
      rounded-lg border border-orange-200
      bg-orange-50/40 p-5
    "
  >
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm text-orange-800">
            Recipe Name
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              className="
                h-9 bg-white
                border-orange-200
                focus:border-orange-400
                focus:ring-orange-300
              "
            />
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
          <FormLabel className="text-sm text-orange-800">
            Description
          </FormLabel>
          <FormControl>
            <Textarea
              rows={3}
              {...field}
              className="
                resize-none bg-white
                border-orange-200
                focus:border-orange-400
                focus:ring-orange-300
              "
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <FormLabel className="text-sm font-medium text-orange-800">
          Ingredients
        </FormLabel>

        <Button
          type="button"
          size="sm"
          variant="outline"
          className="
            border-orange-300
            text-orange-700
            hover:bg-orange-100
          "
          onClick={() =>
            append({ name: "", quantity: 0, unit: "nos" })
          }
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
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
                  <Input
                    {...field}
                    placeholder="Name"
                    className="
                      h-9 bg-white
                      border-orange-200
                      focus:border-orange-400
                    "
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`ingredients.${index}.quantity`}
            render={({ field }) => (
              <FormItem className="w-20">
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    className="
                      h-9 bg-white
                      border-orange-200
                      focus:border-orange-400
                    "
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`ingredients.${index}.unit`}
            render={({ field }) => (
              <FormItem className="w-20">
                <FormControl>
                  <select
                    {...field}
                    className="
                      h-9 w-full rounded-md
                      border border-orange-200
                      bg-white px-2 text-sm
                      focus:ring-2 focus:ring-orange-300
                    "
                  >
                    <option value="nos">nos</option>
                    <option value="mg">mg</option>
                    <option value="ml">ml</option>
                    <option value="l">l</option>
                  </select>
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => remove(index)}
            disabled={fields.length === 1}
            className="hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ))}
    </div>

    {/* Actions */}
    <div className="flex gap-3 pt-2">
      <Button className="bg-orange-600 hover:bg-orange-700">
        Create
      </Button>
      <Button
        type="button"
        variant="outline"
        className="
          border-orange-300
          text-orange-700
          hover:bg-orange-100
        "
        onClick={() => navigate("/")}
      >
        Cancel
      </Button>
    </div>
  </form>
</Form>

  )
}
