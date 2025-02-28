"use client"

import { useState, useMemo, useEffect } from "react"
import { format, parseISO } from "date-fns"
import type { Task } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, Search, SortAsc, SortDesc } from "lucide-react"

type SortOption = "date-asc" | "date-desc" | "title-asc" | "title-desc"

export function ListView() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOption, setSortOption] = useState<SortOption>("date-desc")

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  // Group tasks by date
  const groupedAndFilteredTasks = useMemo(() => {
    // Filter tasks based on search query
    const filteredTasks = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    // Sort tasks based on selected option
    const sortedTasks = [...filteredTasks].sort((a, b) => {
      switch (sortOption) {
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "title-asc":
          return a.title.localeCompare(b.title)
        case "title-desc":
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

    // Group by date
    const grouped: Record<string, Task[]> = {}

    sortedTasks.forEach((task) => {
      const dateStr = task.date
      if (!grouped[dateStr]) {
        grouped[dateStr] = []
      }
      grouped[dateStr].push(task)
    })

    return grouped
  }, [tasks, searchQuery, sortOption])

  // Get dates in order based on sort option
  const orderedDates = useMemo(() => {
    return Object.keys(groupedAndFilteredTasks).sort((a, b) => {
      if (sortOption.startsWith("date")) {
        return sortOption === "date-asc"
          ? new Date(a).getTime() - new Date(b).getTime()
          : new Date(b).getTime() - new Date(a).getTime()
      }
      return 0
    })
  }, [groupedAndFilteredTasks, sortOption])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
          <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">
                <div className="flex items-center">
                  <SortDesc className="mr-2 h-4 w-4" />
                  <span>Date (newest)</span>
                </div>
              </SelectItem>
              <SelectItem value="date-asc">
                <div className="flex items-center">
                  <SortAsc className="mr-2 h-4 w-4" />
                  <span>Date (oldest)</span>
                </div>
              </SelectItem>
              <SelectItem value="title-asc">
                <div className="flex items-center">
                  <SortAsc className="mr-2 h-4 w-4" />
                  <span>Title (A-Z)</span>
                </div>
              </SelectItem>
              <SelectItem value="title-desc">
                <div className="flex items-center">
                  <SortDesc className="mr-2 h-4 w-4" />
                  <span>Title (Z-A)</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {orderedDates.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No tasks found. Try adjusting your search.</div>
      ) : (
        <div className="space-y-8">
          {orderedDates.map((dateStr) => (
            <div key={dateStr} className="space-y-2">
              <h3 className="font-medium text-lg">{format(parseISO(dateStr), "EEEE, MMMM d, yyyy")}</h3>
              <div className="space-y-2">
                {groupedAndFilteredTasks[dateStr].map((task) => (
                  <div key={task.id} className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm">
                    <div className="flex items-start gap-2">
                      <div className="mt-1 bg-green-100 rounded-full p-1">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

