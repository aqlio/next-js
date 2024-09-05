import { INavigationItem } from "@/lib/types/INavigationItem"
import { Users, UserPlus, FolderPlus, Layers, User } from "lucide-react"

export const navigationItems: INavigationItem[] = [
    { name: 'Student List', icon: Users, href: '/student-list' },
    { name: 'Add Student', icon: UserPlus, href: '/add-student' },
    { name: 'Add Classes', icon: FolderPlus, href: '/add-class' },
    { name: 'Class List', icon: Layers, href: '/class-list' },
    { name: 'User Profile', icon: User, href: '/user' },
]