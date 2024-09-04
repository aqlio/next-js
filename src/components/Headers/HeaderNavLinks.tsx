import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Users, UserPlus, FolderPlus, Layers } from "lucide-react"

const navigationItems = [
    { name: 'Student List', icon: Users, href: '/student-list' },
    { name: 'Add Student', icon: UserPlus, href: '/add-student' },
    { name: 'Add Classes', icon: FolderPlus, href: '/add-class' },
    { name: 'Class List', icon: Layers, href: '/class-list' },
]

export default function HeaderNavLinks() {
    const pathname = usePathname()

    return (
        <div className="hidden md:flex md:space-x-4">
            {navigationItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                        "flex items-center text-sm font-medium transition-colors hover:text-primary",
                        pathname === item.href
                            ? "text-primary"
                            : "text-muted-foreground"
                    )}
                >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                </Link>
            ))}
        </div>
    )
}