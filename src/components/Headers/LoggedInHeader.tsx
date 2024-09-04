"use client"





import Link from "next/link"
import * as React from "react"
import { usePathname, useRouter } from "next/navigation"

import { logout } from '@/store/authSlice'
import { useAppDispatch } from '@/store/hooks'

import Logo from "@/components/Logo"
import MobileNavMenu from "@/components/Navigations/TeacherLeftNav"
import ProfileDropdownMenu from "@/components/Profile/ProfileDropdownMenu"
import HeaderNavLinks from "@/components/Headers/HeaderNavLinks"
import { navigationItems } from "@/config/navigation"






export default function LoggedInHeader() {



    const router = useRouter();
    const pathname = usePathname()
    const dispatch = useAppDispatch();




    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    }


    


    return (
        <nav className="border-b bg-background">
            <div className="flex h-16 items-center px-4">
                <Logo className="mr-4" />
                <HeaderNavLinks />
                <div className="flex-grow" />
                <div className="flex items-center justify-between space-x-2 md:justify-end">
                    <ProfileDropdownMenu />
                </div>
                <MobileNavMenu navigationItems={navigationItems} />
            </div>
        </nav>
    )
}