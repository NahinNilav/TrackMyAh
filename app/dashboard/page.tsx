"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarView } from "@/components/calendar-view"
import { RegularTasksManager } from "@/components/regular-tasks-manager"
import type { RegularTask } from "@/lib/types"

export default function DashboardPage() {
  const [regularTasks, setRegularTasks] = useState<RegularTask[]>([])

  useEffect(() => {
    const storedRegularTasks = localStorage.getItem("regularTasks")
    if (storedRegularTasks) {
      setRegularTasks(JSON.parse(storedRegularTasks))
    }
  }, [])

  const handleRegularTaskUpdated = (updatedTask: RegularTask) => {
    const updatedTasks = regularTasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    )
    setRegularTasks(updatedTasks)
    localStorage.setItem("regularTasks", JSON.stringify(updatedTasks))
  }

  const handleRegularTaskDeleted = (taskId: string) => {
    const updatedTasks = regularTasks.filter((task) => task.id !== taskId)
    setRegularTasks(updatedTasks)
    localStorage.setItem("regularTasks", JSON.stringify(updatedTasks))
  }

  const handleRegularTaskCreated = (newTask: RegularTask) => {
    const updatedTasks = [...regularTasks, newTask]
    setRegularTasks(updatedTasks)
    localStorage.setItem("regularTasks", JSON.stringify(updatedTasks))
  }

  return (
    <div className="container py-6">
      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="regular">Regular Tasks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar">
          <div className="space-y-4">
            <h1 className="font-semibold text-3xl">2025</h1>
            <CalendarView regularTasks={regularTasks} />
          </div>
        </TabsContent>
        
        <TabsContent value="regular">
          <RegularTasksManager
            regularTasks={regularTasks}
            onTaskCreated={handleRegularTaskCreated}
            onTaskUpdated={handleRegularTaskUpdated}
            onTaskDeleted={handleRegularTaskDeleted}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

