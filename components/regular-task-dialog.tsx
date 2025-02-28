"use client"

import { useState, useEffect } from "react"
import { format, parseISO } from "date-fns"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import type { RegularTask } from "@/lib/types"

interface RegularTaskDialogProps {
  isOpen: boolean
  onClose: () => void
  onTaskCreated: (task: RegularTask) => void
  editingTask?: RegularTask | null
}

export function RegularTaskDialog({
  isOpen,
  onClose,
  onTaskCreated,
  editingTask,
}: RegularTaskDialogProps) {
  const [title, setTitle] = useState(editingTask?.title || "")
  const [description, setDescription] = useState(editingTask?.description || "")
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>(
    editingTask
      ? {
          from: parseISO(editingTask.startDate),
          to: parseISO(editingTask.endDate),
        }
      : undefined
  )
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">(
    editingTask?.frequency || "daily"
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (!isOpen) {
      if (!editingTask) {
        setTitle("")
        setDescription("")
        setDateRange(undefined)
        setFrequency("daily")
      } else {
        setTitle(editingTask.title)
        setDescription(editingTask.description)
        setDateRange({
          from: parseISO(editingTask.startDate),
          to: parseISO(editingTask.endDate),
        })
        setFrequency(editingTask.frequency)
      }
    }
  }, [isOpen, editingTask])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!dateRange?.from || !dateRange?.to) {
      toast({
        title: "Date range required",
        description: "Please select a start and end date for the regular task.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    const task: RegularTask = {
      id: editingTask?.id || Math.random().toString(36).substr(2, 9),
      title,
      description,
      startDate: format(dateRange.from, "yyyy-MM-dd"),
      endDate: format(dateRange.to, "yyyy-MM-dd"),
      frequency,
      userEmail: localStorage.getItem("userEmail") || "",
      createdAt: editingTask?.createdAt || new Date().toISOString(),
    }

    onTaskCreated(task)
    toast({
      title: editingTask ? "Task updated" : "Task created",
      description: `Your regular task has been successfully ${editingTask ? "updated" : "created"}.`,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editingTask ? "Edit Regular Task" : "Create Regular Task"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add task details..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Date Range</Label>
              <DateRangePicker
                value={dateRange}
                onChange={setDateRange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select value={frequency} onValueChange={(value: "daily" | "weekly" | "monthly") => setFrequency(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Regular Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 