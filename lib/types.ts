export interface Task {
  id: string
  title: string
  description: string
  date: string
  userEmail: string
  createdAt: string
  isRegularTask?: boolean
  regularTaskId?: string // Reference to the regular task if this is a completion
}

export interface RegularTask {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  userEmail: string
  createdAt: string
  frequency: 'daily' | 'weekly' | 'monthly'
}

export interface CreateTaskInput {
  title: string
  description: string
  date: string
  userEmail: string
}

