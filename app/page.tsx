import LoginForm from "@/components/login-form"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-neutral-100 via-neutral-50 to-white">
      <div className="w-full max-w-md space-y-8 p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-neutral-900">TrackMyAh</h1>
          <p className="mt-2 text-neutral-600">Track your daily completed tasks</p>
        </div>
        <div className="gradient-card p-8 rounded-2xl shadow-xl border border-neutral-200/50">
          <LoginForm />
        </div>
      </div>
    </main>
  )
}

