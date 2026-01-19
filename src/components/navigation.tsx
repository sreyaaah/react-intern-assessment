import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "./ui/button"

const pageLinks = [
    {
        path: "/",
        label: "Home",
    },
    {
        path: "/create",
        label: "Create",
    },
    {
        path: "/archive",
        label: "Archive",
    },
]

export function Navigation() {
    const navigate = useNavigate()
    const location = useLocation()

    return <nav className="flex gap-3 justify-center">
        {pageLinks?.map(link => (
            <Button
                key={link.path}
                variant={location.pathname === link.path ? 'default' : 'outline'}
                onClick={() => navigate(link.path)}
            >
                {link.label}
            </Button>
        ))}
    </nav>
}
