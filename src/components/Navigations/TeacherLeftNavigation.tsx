"use client";

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Users, UserPlus, FolderPlus, Layers, Menu, ChevronLeft, ChevronRight } from 'lucide-react'

const menuItems = [
  { name: 'Student List', icon: Users, href: '/teacher/student-list' },
  { name: 'Add Student', icon: UserPlus, href: '/teacher/add-student' },
  { name: 'Add Classes', icon: FolderPlus, href: '/teacher/add-class' },
  { name: 'Class List', icon: Layers, href: '/teacher/class-list' },
]

export default function TeacherLeftNavigation() {
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const NavItems = ({ showText = true }) => (
    <>
      {menuItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            "flex items-center text-sm font-medium text-muted-foreground rounded-lg hover:bg-muted px-3 py-2 transition-colors",
            router.pathname === item.href && "bg-muted text-foreground",
            !showText && "justify-center"
          )}
          title={item.name}
        >
          <item.icon className={cn("h-5 w-5", showText && "mr-3")} />
          {showText && item.name}
        </Link>
      ))}
    </>
  )

  return (
    <>
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex flex-col border-r bg-background transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4">
          {!isCollapsed && <h2 className="text-lg font-semibold">Navigation</h2>}
          <Button variant="ghost" size="icon" onClick={toggleCollapse} className="lg:flex hidden">
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        <ScrollArea className="flex-1 px-4 py-6">
          <nav className="flex flex-col space-y-2">
            <NavItems showText={!isCollapsed} />
          </nav>
        </ScrollArea>
      </aside>

      <Button 
        variant="ghost" 
        size="icon" 
        className="lg:hidden fixed top-4 left-4 z-40"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>

      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="w-64 pt-16">
          <ScrollArea className="flex-1 px-2">
            <nav className="flex flex-col space-y-2">
              <NavItems />
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  )
}