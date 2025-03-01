"use client"

import { useState, useRef, useEffect } from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns"
import { cn } from "@/lib/utils"
import type { Task, RegularTask } from "@/lib/types"
import { TaskDialog } from "@/components/task-dialog"
import { TaskPopover } from "@/components/task-popover"

// Add this helper function to get the appropriate background color based on task count
const getTaskBackgroundColor = (taskCount: number) => {
  if (taskCount === 0) return ""
  const intensity = Math.min(taskCount, 10) // Cap at 10 tasks
  const intensityScale = [
    "bg-green-50 hover:bg-green-100",
    "bg-green-100 hover:bg-green-200",
    "bg-green-200 hover:bg-green-300",
    "bg-green-300 hover:bg-green-400",
    "bg-green-400 hover:bg-green-500",
    "bg-green-500 hover:bg-green-600",
    "bg-green-600 hover:bg-green-700",
    "bg-green-700 hover:bg-green-800",
    "bg-green-800 hover:bg-green-900",
    "bg-green-900 hover:bg-green-950",
  ]
  return intensityScale[intensity - 1]
}

// Update the component props
interface CalendarViewProps {
  regularTasks: RegularTask[]
}

export function CalendarView({ regularTasks }: CalendarViewProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null)
  const [showPopover, setShowPopover] = useState(false)
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Add this useEffect to load tasks from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  const getMonthDays = (year: number, month: number) => {
    const startDate = startOfMonth(new Date(year, month, 1))
    const endDate = endOfMonth(startDate)
    return eachDayOfInterval({ start: startDate, end: endDate })
  }

  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => isSameDay(new Date(task.date), date))
  }

  const hasTasksOnDate = (date: Date) => {
    return getTasksForDate(date).length > 0
  }

  const handleDateHover = (date: Date) => {
    setHoveredDate(date)

    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
    }

    hoverTimerRef.current = setTimeout(() => {
      if (hasTasksOnDate(date)) {
        setShowPopover(true)
      }
    }, 500)
  }

  const handleDateLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
    }
    setShowPopover(false)
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setIsDialogOpen(true)
  }

  const handleTaskCreated = (newTask: Task) => {
    const updatedTasks = [...tasks, newTask]
    setTasks(updatedTasks)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
  }

  const handleTaskUpdated = (updatedTask: Task) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    )
    setTasks(updatedTasks)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
  }

  const handleTaskDeleted = (taskId: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(updatedTasks)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
  }

  const handleRegularTaskCreated = (newTask: RegularTask) => {
    const updatedTasks = [...regularTasks, newTask]
    localStorage.setItem("regularTasks", JSON.stringify(updatedTasks))
  }

  const renderTaskCount = (date: Date) => {
    const count = getTasksForDate(date).length
    if (count === 0) return null
    return (
      <div className="absolute bottom-1 right-1 text-xs bg-purple-100 text-purple-900 rounded-full px-1.5">
        {count}
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {months.map((month, monthIndex) => {
          const year = 2025
          const days = getMonthDays(year, monthIndex)
          const firstDayOfMonth = days[0].getDay()

          return (
            <div key={month} className="mb-6">
              <h2 className="text-lg font-medium mb-2">{month}</h2>
              <div className="grid grid-cols-7 gap-1">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-muted-foreground py-1">
                    {day}
                  </div>
                ))}

                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                  <div key={`empty-${index}`} className="h-8 text-center text-xs p-1"></div>
                ))}

                {days.map((day) => {
                  const dateStr = format(day, "yyyy-MM-dd")
                  const dayTasks = getTasksForDate(day)
                  const taskCount = dayTasks.length

                  return (
                    <div
                      key={dateStr}
                      className={cn(
                        "h-8 text-center text-xs p-1 relative rounded-md cursor-pointer transition-colors",
                        getTaskBackgroundColor(taskCount),
                        taskCount > 0 && "font-medium text-neutral-900",
                        "hover:ring-1 hover:ring-neutral-400 hover:ring-inset",
                      )}
                      onMouseEnter={() => handleDateHover(day)}
                      onMouseLeave={handleDateLeave}
                      onClick={() => handleDateClick(day)}
                    >
                      <span className="relative z-10">{format(day, "d")}</span>
                      {taskCount > 0 && (
                        <span className="absolute bottom-1 right-1 text-[10px] font-medium">
                          {taskCount}
                        </span>
                      )}
                      {hoveredDate && isSameDay(hoveredDate, day) && showPopover && taskCount > 0 && (
                        <TaskPopover tasks={dayTasks} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {selectedDate && (
        <TaskDialog
          date={selectedDate}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          existingTasks={selectedDate ? getTasksForDate(selectedDate) : []}
          regularTasks={regularTasks}
          onTaskCreated={handleTaskCreated}
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
        />
      )}
    </>
  )
}
