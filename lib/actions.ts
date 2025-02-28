"use server"

import { revalidatePath } from "next/cache"
import { createTaskInDb } from "@/lib/tasks"
import type { CreateTaskInput } from "@/lib/types"

export async function createTask(input: CreateTaskInput) {
  try {
    await createTaskInDb(input)
    revalidatePath("/dashboard")
    revalidatePath("/dashboard/list")
    return { success: true }
  } catch (error) {
    console.error("Failed to create task:", error)
    return { success: false, error: "Failed to create task" }
  }
}

