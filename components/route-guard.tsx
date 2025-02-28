"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    authCheck()
  }, [])

  const authCheck = () => {
    const userEmail = localStorage.getItem("userEmail")
    if (!userEmail) {
      setAuthorized(false)
      toast({
        title: "Unauthorized",
        description: "Please log in to access this page",
        variant: "destructive",
      })
      router.push("/")
    } else {
      setAuthorized(true)
    }
  }

  if (!authorized) {
    return null // Don't render anything while checking auth
  }

  return <>{children}</>
} 