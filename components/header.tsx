"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Calendar, List, LogOut, CheckCircle, ClipboardCheck, CheckSquare } from "lucide-react"
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
    <header className="flex items-center h-16 px-2 sm:px-4 border-b shrink-0 md:px-6 bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900">
      <Link href="/dashboard" className="flex items-center gap-1 sm:gap-2 text-base sm:text-lg font-semibold text-white min-w-fit">
        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="hidden xs:inline">TrackMyAh</span>
      </Link>
      <nav className="flex items-center gap-1 sm:gap-4 ml-2 sm:ml-auto">
        <Link
          href="/dashboard"
          className={cn(
            "flex items-center gap-1 text-xs sm:text-sm font-medium px-2 sm:px-3 py-2 rounded-md",
            pathname === "/dashboard" ? "bg-white text-primary" : "text-white hover:bg-primary-foreground/10"
          )}
        >
          <Calendar className="w-4 h-4" />
          <span>Calendar</span>
        </Link>
        <Link
          href="/dashboard/list"
          className={cn(
            "flex items-center gap-1 text-xs sm:text-sm font-medium px-2 sm:px-3 py-2 rounded-md",
            pathname === "/dashboard/list" ? "bg-white text-primary" : "text-white hover:bg-primary-foreground/10"
          )}
        >
          <List className="w-4 h-4" />
          <span>List</span>
        </Link>
        <div className="flex items-center gap-2 ml-2 sm:ml-4">
          <span className="text-white text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none">
            {userEmail}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSignOut}
            className="text-white hover:bg-primary-foreground/10 ml-1"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </nav>
    </header>
  )
}

