"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simple client-side validation
    if (email === "admin@gmail.com" && password === "123") {
      // Simulate login
      setTimeout(() => {
        setIsLoading(false)
        localStorage.setItem("userEmail", email)
        router.push("/dashboard")
      }, 1000)
    } else {
      setIsLoading(false)
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-white"
        />
      </div>
      <Button type="submit" className="w-full gradient-primary" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
      <p className="text-center text-sm text-neutral-600">
        Don't have an account?{" "}
        <Link href="/signup" className="font-medium text-neutral-900 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  )
}

