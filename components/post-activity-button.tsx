"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TaskDialog } from "@/components/task-dialog"
import type { Task } from "@/lib/types"

interface PostActivityButtonProps {
  tasks: Task[]
}

export function PostActivityButton({ tasks }: PostActivityButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const today = new Date()

  const todaysTasks = tasks.filter((task) => {
    const taskDate = new Date(task.date)
    return (
      taskDate.getDate() === today.getDate() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getFullYear() === today.getFullYear()
    )
  })

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)} className="bg-[#0f172a] hover:bg-[#1e293b] text-white">
        <Plus className="mr-2 h-4 w-4" />
        Post Activity
      </Button>

      <TaskDialog
        date={today}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        existingTasks={todaysTasks}
        regularTasks={[]}
        onTaskCreated={(task) => console.log('Task created:', task)}
        onTaskUpdated={(task) => console.log('Task updated:', task)}
        onTaskDeleted={(taskId) => console.log('Task deleted:', taskId)}
      />
    </>
  )
}
