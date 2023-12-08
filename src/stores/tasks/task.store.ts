import { StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Task, TaskStatus } from '../../interfaces'

interface TaskState {
  tasks: Record<string, Task> // tasks: { [key: string]: Task }
  getTaskByStatus: (status: TaskStatus) => Task[]
  addTask: (title: string, status: TaskStatus) => void

  draggingTaskId?: string

  setDraggingTaskId: (taskId: string) => void
  removeDraggingTaskId: () => void

  changeTaskStatus: (taskId: string, status: TaskStatus) => void
  onTaskDrop: (status: TaskStatus) => void
}

export const storeApi: StateCreator<TaskState> = (set, get, store) => ({
  tasks: {
    'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'open' },
    'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'in-progress' },
    'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'open' }
  },

  getTaskByStatus: (status: TaskStatus) => {
    const tasks = get().tasks
    // const a = Object.values(tasks)
    // console.log({ a })
    return Object.values(tasks).filter((task) => task.status === status)
  },

  addTask: (title: string, status: TaskStatus) => {
    const newTask = { id: crypto.randomUUID(), title, status }
    set((state) => ({
      tasks: {
        ...state.tasks,
        [newTask.id]: newTask
      }
    }))
  },

  draggingTaskId: undefined,

  setDraggingTaskId: (taskId: string) => {
    set({ draggingTaskId: taskId })
  },

  removeDraggingTaskId: () => {
    set({ draggingTaskId: undefined })
  },

  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    const task = get().tasks[taskId]
    task.status = status
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: task
      }
    }))
  },

  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId
    if (!taskId) return
    get().changeTaskStatus(taskId, status)
    get().removeDraggingTaskId()
  }
})

export const useTaskStore = create<TaskState>()(devtools(storeApi))
