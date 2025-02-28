"use client"

import { useState } from "react"
import { format, parseISO } from "date-fns"
import { Pencil, Trash2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { RegularTaskDialog } from "@/components/regular-task-dialog"
import type { RegularTask } from "@/lib/types"

interface RegularTasksManagerProps {
  regularTasks: RegularTask[]
  onTaskUpdated: (task: RegularTask) => void
  onTaskDeleted: (taskId: string) => void
}

export function RegularTasksManager({
  regularTasks,
  onTaskUpdated,
  onTaskDeleted,
}: RegularTasksManagerProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<RegularTask | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [taskToDelete, setTaskToDelete] = useState<RegularTask | null>(null)

  const handleEdit = (task: RegularTask) => {
    setEditingTask(task)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (task: RegularTask) => {
    setTaskToDelete(task)
    setDeleteConfirmOpen(true)
  }

  const confirmDelete = () => {
    if (taskToDelete) {
      onTaskDeleted(taskToDelete.id)
      setDeleteConfirmOpen(false)
      setTaskToDelete(null)
    }
  }

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'daily':
        return 'Every day'
      case 'weekly':
        return 'Every week'
      case 'monthly':
        return 'Every month'
      default:
        return frequency
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Regular Tasks</h2>
        <Button
          onClick={() => setIsEditDialogOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Create Regular Task
        </Button>
      </div>

      <div className="grid gap-4">
        {regularTasks.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No regular tasks created yet.
          </p>
        ) : (
          regularTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 rounded-lg border bg-card shadow-sm group relative"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(parseISO(task.startDate), "MMM d, yyyy")} -{" "}
                      {format(parseISO(task.endDate), "MMM d, yyyy")}
                    </span>
                    <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                      {getFrequencyLabel(task.frequency)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(task)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => handleDelete(task)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <RegularTaskDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false)
          setEditingTask(null)
        }}
        onTaskCreated={onTaskUpdated}
        editingTask={editingTask}
      />

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Regular Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this regular task? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
} 