import { Navigation } from "./navigation";
import { ChefHat } from "lucide-react";

export function Header() {
    return <div className="border-b bg-white sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                    <ChefHat className="h-8 w-8 text-primary" />
                    <h1 className="text-2xl font-bold text-gray-900">Grandma's Recipe Book</h1>
                </div>
                <Navigation />
            </div>
        </div>
    </div>
}
