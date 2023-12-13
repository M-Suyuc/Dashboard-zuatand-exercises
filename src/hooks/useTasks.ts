import { useState } from 'react'
import Swal from 'sweetalert2'
import { useTaskStore } from '../stores'
import { TaskStatus } from '../interfaces'

interface Options {
  status: TaskStatus
}

export const useTasks = ({ status }: Options) => {
  const [onDragOver, setOnDragOver] = useState(false)
  const addTask = useTaskStore((state) => state.addTask)

  const handleAddTask = async () => {
    const { isConfirmed, value } = await Swal.fire({
      title: 'New task',
      input: 'text',
      inputLabel: 'Name task',
      inputPlaceholder: 'enter task name',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'you must enter a name for the task'
        }
      }
    })

    if (!isConfirmed) return

    addTask(value, status)
  }

  const isDragging = useTaskStore((state) => !!state.draggingTaskId)
  // console.log(draggingTaskId)
  // console.log(!draggingTaskId)
  // console.log(!!draggingTaskId)

  // const changeTaskStatus = useTaskStore((state) => state.changeTaskStatus)
  // const draggingTaskId = useTaskStore((state) => state.draggingTaskId)
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop)

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    console.log('onDragOver')
    setOnDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    console.log('onDragLeave')
    setOnDragOver(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    console.log('onDrop', status)
    setOnDragOver(false)
    // changeTaskStatus(draggingTaskId, value)
    onTaskDrop(status)
  }
  return {
    isDragging,

    onDragOver,
    handleAddTask,
    handleDragOver,
    handleDragLeave,
    handleDrop
  }
}
