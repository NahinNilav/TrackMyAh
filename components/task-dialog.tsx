"use client"

import { useState } from "react"
import { format, isSameDay, parseISO } from "date-fns"
import { Pencil, Trash2, CheckCircle2, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Task, RegularTask } from "@/lib/types"

interface TaskDialogProps {
  date: Date
  isOpen: boolean
  onClose: () => void
  existingTasks: Task[]
  regularTasks: RegularTask[]
  onTaskCreated: (task: Task) => void
  onTaskUpdated: (task: Task) => void
  onTaskDeleted: (taskId: string) => void
}

export function TaskDialog({
  date,
  isOpen,
  onClose,
  existingTasks,
  regularTasks,
  onTaskCreated,
  onTaskUpdated,
  onTaskDeleted,
}: TaskDialogProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null)
  const { toast } = useToast()

  // Get regular tasks that should be shown for this date
  const getApplicableRegularTasks = () => {
    return regularTasks.filter(task => {
      const startDate = parseISO(task.startDate)
      const endDate = parseISO(task.endDate)
      const currentDate = date

      if (currentDate < startDate || currentDate > endDate) return false

      switch (task.frequency) {
        case 'daily':
          return true
        case 'weekly':
          return startDate.getDay() === currentDate.getDay()
        case 'monthly':
          return startDate.getDate() === currentDate.getDate()
        default:
          return false
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (editingTask) {
      const updatedTask = {
        ...editingTask,
        title,
        description,
      }
      onTaskUpdated(updatedTask)
      toast({
        title: "Task updated",
        description: "Your task has been successfully updated.",
      })
    } else {
      const newTask: Task = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        description,
        date: format(date, "yyyy-MM-dd"),
        userEmail: localStorage.getItem("userEmail") || "",
        createdAt: new Date().toISOString(),
      }
      onTaskCreated(newTask)
      toast({
        title: "Task created",
        description: "Your task has been successfully created.",
      })
    }

    setTitle("")
    setDescription("")
    setIsSubmitting(false)
    setEditingTask(null)
    onClose()
  }

  const handleToggleRegularTask = (regularTask: RegularTask) => {
    const isCompleted = isRegularTaskCompleted(regularTask.id)
    
    if (isCompleted) {
      // Find and delete the completion record
      const completionTask = existingTasks.find(
        task => task.regularTaskId === regularTask.id && 
        isSameDay(parseISO(task.date), date)
      )
      if (completionTask) {
        onTaskDeleted(completionTask.id)
        toast({
          title: "Task unchecked",
          description: "The task has been unmarked for today.",
        })
      }
    } else {
      // Create new completion record
      const newTask: Task = {
        id: Math.random().toString(36).substr(2, 9),
        title: regularTask.title,
        description: regularTask.description,
        date: format(date, "yyyy-MM-dd"),
        userEmail: localStorage.getItem("userEmail") || "",
        createdAt: new Date().toISOString(),
        isRegularTask: true,
        regularTaskId: regularTask.id,
      }
      onTaskCreated(newTask)
      toast({
        title: "Task completed",
        description: "The task has been marked as complete for today.",
      })
    }
  }

  const isRegularTaskCompleted = (regularTaskId: string) => {
    return existingTasks.some(
      task => task.regularTaskId === regularTaskId && 
      isSameDay(parseISO(task.date), date)
    )
  }

  const applicableRegularTasks = getApplicableRegularTasks()

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setTitle(task.title)
    setDescription(task.description)
  }

  const handleDelete = (task: Task) => {
    setTaskToDelete(task)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = () => {
    if (taskToDelete) {
      onTaskDeleted(taskToDelete.id)
      toast({
        title: "Task deleted",
        description: "Your task has been successfully deleted.",
      })
      setDeleteConfirmOpen(false)
      setTaskToDelete(null)
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Tasks for {format(date, "MMMM d, yyyy")}</DialogTitle>
            <DialogDescription>
              Manage your tasks and mark regular tasks as complete.
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="regular" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="regular">Regular Tasks</TabsTrigger>
              <TabsTrigger value="one-time">One-time Tasks</TabsTrigger>
            </TabsList>

            <TabsContent value="regular" className="space-y-4 mt-4">
              {applicableRegularTasks.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No regular tasks scheduled for this date.
                </p>
              ) : (
                <div className="space-y-2">
                  {applicableRegularTasks.map((task) => {
                    const isCompleted = isRegularTaskCompleted(task.id)
                    return (
                      <div key={task.id} className="p-3 rounded-md bg-muted flex items-start gap-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 mt-0.5"
                          onClick={() => handleToggleRegularTask(task)}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <Circle className="h-5 w-5" />
                          )}
                        </Button>
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="one-time" className="space-y-4 mt-4">
              {existingTasks.filter(task => !task.isRegularTask).length > 0 && (
                <div className="space-y-2 mb-4">
                  <h3 className="text-sm font-medium">Completed Tasks:</h3>
                  <div className="space-y-2">
                    {existingTasks
                      .filter(task => !task.isRegularTask)
                      .map((task) => (
                        <div key={task.id} className="p-3 rounded-md bg-muted group">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-medium">{task.title}</h4>
                              <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleEdit(task)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => handleDelete(task)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Task Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="What did you accomplish?"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Add details about your completed task..."
                      rows={3}
                    />
                  </div>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : editingTask ? "Save Changes" : "Add Task"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

