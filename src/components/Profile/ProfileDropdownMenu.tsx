import React from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from '@/store/hooks'
import { logout } from '@/store/authSlice'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import UserAvatar from "@/components/Profile/UserAvatar"

export default function ProfileDropdownMenu() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <UserAvatar avatarName="vishal" avatarUrl="https://i.pravatar.cc/150?u=vishal@example.com" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}