"use client";

import Link from 'next/link'
import { MountainIcon } from 'lucide-react'

export default function Component() {
  return (
    <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-background border-b absolute top-0 left-0 right-0">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <MountainIcon className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">Logo</span>
        </Link>
        <nav className="sm:flex space-x-4 items-center">
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Login
          </Link>
          <Link href="/signup" className="text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 px-3 py-2 rounded-md transition-colors">
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  )
}