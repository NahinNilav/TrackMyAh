import SignUpForm from "@/components/signup-form"

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-neutral-900">Create Account</h1>
          <p className="mt-2 text-neutral-600">Start tracking your daily tasks</p>
        </div>
        <div className="gradient-card p-8 rounded-2xl shadow-xl border border-neutral-200/50">
          <SignUpForm />
        </div>
      </div>
    </main>
  )
} 