"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Calendar, List, LogOut, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const email = localStorage.getItem("userEmail")
    if (email) {
      setUserEmail(email)
    }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  return (
    <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900">
      <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold text-white">
        <Package className="w-6 h-6" />
        TrackMyAh
      </Link>
      <nav className="ml-auto flex items-center gap-4">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-md",
            pathname === "/dashboard" ? "bg-white text-primary" : "text-white hover:bg-primary-foreground/10",
          )}
        >
          <Calendar className="w-4 h-4" />
          <span>Calendar</span>
        </Link>
        <Link
          href="/dashboard/list"
          className={cn(
            "flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-md",
            pathname === "/dashboard/list" ? "bg-white text-primary" : "text-white hover:bg-primary-foreground/10",
          )}
        >
          <List className="w-4 h-4" />
          <span>List</span>
        </Link>
        <div className="text-white text-sm ml-4">{userEmail}</div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSignOut}
          className="text-white hover:bg-primary-foreground/10"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </nav>
    </header>
  )
}

