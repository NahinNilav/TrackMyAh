import { ListView } from "@/components/list-view"

export default function ListPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="font-semibold text-3xl mb-6">Task List</h1>
      <ListView />
    </div>
  )
}

