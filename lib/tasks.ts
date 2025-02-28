import type { Task } from "@/lib/types"

// In a real application, you would use a database
// This is a simplified example with in-memory storage
const tasks: Task[] = [
  {
    id: "1",
    title: "Completed project proposal",
    description: "Finished the quarterly project proposal for the marketing team",
    date: "2025-02-12",
    userEmail: "xsitalia2660@proton.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Updated website content",
    description: "Refreshed the about page with new company information",
    date: "2025-02-13",
    userEmail: "xsitalia2660@proton.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Client meeting",
    description: "Had a successful meeting with the new client",
    date: "2025-02-14",
    userEmail: "xsitalia2660@proton.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Fixed critical bug",
    description: "Resolved the authentication issue in the production environment",
    date: "2025-02-18",
    userEmail: "xsitalia2660@proton.com",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Team retrospective",
    description: "Conducted the sprint retrospective with the development team",
    date: "2025-02-19",
    userEmail: "xsitalia2660@proton.com",
    createdAt: new Date().toISOString(),
  },
]

export async function getTasks(userEmail: string): Promise<Task[]> {
  // Simulate database query delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return tasks.filter((task) => task.userEmail === userEmail)
}

export async function createTaskInDb(task: Omit<Task, "id" | "createdAt">): Promise<Task> {
  // Simulate database query delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const newTask: Task = {
    ...task,
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date().toISOString(),
  }

  tasks.push(newTask)
  return newTask
}

