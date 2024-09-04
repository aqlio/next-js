"use client"





import Link from "next/link"
import * as React from "react"
import { usePathname, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { logout } from '@/store/authSlice'
import { useAppDispatch } from '@/store/hooks'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Users, UserPlus, FolderPlus, Layers, LogOut } from "lucide-react"


import Logo from "@/components/Logo"
import UserAvatar from "@/components/Profile/UserAvatar"
import MobileNavMenu from "@/components/Navigations/TeacherLeftNav"
import ProfileDropdownMenu from "@/components/Profile/ProfileDropdownMenu"







const navigationItems = [
    { name: 'Student List', icon: Users, href: '/student-list' },
    { name: 'Add Student', icon: UserPlus, href: '/add-student' },
    { name: 'Add Classes', icon: FolderPlus, href: '/add-class' },
    { name: 'Class List', icon: Layers, href: '/class-list' },
]





export default function HeaderAndNavigation() {



    const router = useRouter();
    const pathname = usePathname()
    const dispatch = useAppDispatch();




    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    }


    


    return (
        <nav className="border-b">
            <div className="flex h-16 items-center px-4">
                <Logo className="mr-4" />
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
                <div className="flex-grow" />
                <div className="flex items-center justify-between space-x-2 md:justify-end">
                    <ProfileDropdownMenu />
                </div>
                <MobileNavMenu navigationItems={navigationItems} />
            </div>
        </nav>
    )
}