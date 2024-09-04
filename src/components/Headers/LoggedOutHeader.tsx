"use client"





import * as React from "react"
import Logo from "@/components/Logo"








export default function LoggedOutHeader() {



    return (
        <nav className="border-b absolute top-0 left-0 right-0 z-50 bg-background">
            <div className="flex h-16 items-center px-4">
                <Logo className="mr-4" />
            </div>
        </nav>
    )



}