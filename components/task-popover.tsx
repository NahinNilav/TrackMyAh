"use client"

import type { Task } from "@/lib/types"
import { Check } from "lucide-react"

interface TaskPopoverProps {
  tasks: Task[]
}

export function TaskPopover({ tasks }: TaskPopoverProps) {
  if (tasks.length === 0) return null

  return (
    <div className="absolute z-50 top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 bg-white rounded-lg shadow-lg border">
      <h3 className="font-medium text-sm mb-2">Completed Tasks:</h3>
      <div className="max-h-[200px] overflow-y-auto space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-start gap-2">
            <div className="mt-0.5 bg-green-100 rounded-full p-0.5">
              <Check className="h-3 w-3 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">{task.title}</p>
              {task.description && <p className="text-xs text-muted-foreground">{task.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

