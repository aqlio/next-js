"use client";

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, UserPlus, LogOut, Menu } from 'lucide-react'

// In a real application, you'd fetch this data from your auth system
const teacher = {
    name: "Jane Smith",
    avatarUrl: "https://i.pravatar.cc/150?u=janesmith@example.com"
}

export default function Component() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const handleLogout = () => {
        console.log("Logout clicked")
        // Implement logout logic here
    }

    return (
        <header className="bg-background border-b">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/dashboard" className="flex-shrink-0">
                            <BookOpen className="h-8 w-8 text-primary" />
                            <span className="sr-only">Tuition Academy</span>
                        </Link>
                    </div>
                    <nav className="hidden md:flex space-x-4">
                        <Link href="/teacher/student-list" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium">
                            Student List
                        </Link>
                        <Link href="/teacher/add-student" className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium">
                            Add Student
                        </Link>
                    </nav>
                    <div className="hidden md:flex items-center space-x-4">
                        <span className="text-sm font-medium">Welcome, {teacher.name}</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={teacher.avatarUrl} alt={teacher.name} />
                                        <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
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
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={teacher.avatarUrl} alt={teacher.name} />
                                    <AvatarFallback>{teacher.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
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