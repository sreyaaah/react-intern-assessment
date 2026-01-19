import { Outlet } from "react-router-dom";
import { Header } from "./components/header";
import { Toaster } from "./components/ui/toaster";

export default function Layout() {
    return <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto">
            <Outlet />
        </main>
        <Toaster />
    </div>
}
