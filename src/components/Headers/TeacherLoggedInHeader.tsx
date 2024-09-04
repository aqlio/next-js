"use client";




import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation';


import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button"


import { logout } from '@/store/authSlice';
import { useAppDispatch } from '@/store/hooks';
import { LogOut, Menu } from 'lucide-react'

import Logo from '@/components/Logo'
import UserAvatar from '@/components/Profile/UserAvatar';


const teacher = {
    name: "Jane Smith",
    avatarUrl: "https://i.pravatar.cc/150?u=janesmith@example.com"
}








export default function TeacherLoggedInHeader() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    }

    return (
        <header className="bg-background border-b">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Logo />
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <span className="text-sm font-medium">Welcome, {teacher.name}</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <UserAvatar avatarName={teacher.name} avatarUrl={teacher.avatarUrl} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>





                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Open menu">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>





                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/students" className="text-muted-foreground hover:text-foreground block px-3 py-2 rounded-md text-base font-medium">
                            Student List
                        </Link>
                        <Link href="/add-student" className="text-muted-foreground hover:text-foreground block px-3 py-2 rounded-md text-base font-medium">
                            Add Student
                        </Link>
                        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </Button>
                    </div>
                    <div className="pt-4 pb-3 border-t border-muted">
                        <div className="flex items-center px-5">
                            <div className="flex-shrink-0">
                                <UserAvatar className="h-10 w-10" avatarName={teacher.name} avatarUrl={teacher.avatarUrl} />
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium">{teacher.name}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}