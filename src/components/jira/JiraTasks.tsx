import { IoAddOutline, IoCheckmarkCircleOutline } from 'react-icons/io5'
import classNames from 'classnames'
import { Task, TaskStatus } from '../../interfaces'
import { useTaskStore } from '../../stores'
import { SingleTask } from './SingleTask'
import { useState } from 'react'
import Swal from 'sweetalert2'

interface Props {
  title: string
  tasks: Task[]
  status: TaskStatus
}

export const JiraTasks = ({ title, tasks, status }: Props) => {
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

  return (
    <div
      onDragOver={handleDragOver}
      // onDragOver: se ejecuta al mover el elemento dentro de su misma caja
      onDragLeave={handleDragLeave}
      // onDragLeave: se ejecuta al mover el elemento fuera de su caja
      onDrop={handleDrop}
      // onDraop: se ejecuta al soltar el elemento dentro de otra caja de lo contraio no se ejecuta
      className={classNames(
        '!text-black relative flex flex-col rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px] border-4',
        { 'border-blue-500 border-dotted': isDragging },
        { 'border-green-500 border-dotted': isDragging && onDragOver }
      )}
    >
      {/* Task Header */}
      <div className='relative flex flex-row justify-between'>
        <div className='flex items-center justify-center'>
          <div className='flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100'>
            <span className='flex justify-center items-center h-6 w-6 text-brand-500'>
              <IoCheckmarkCircleOutline style={{ fontSize: '50px' }} />
            </span>
          </div>

          <h4 className='ml-4 text-xl font-bold text-navy-700'>{title}</h4>
        </div>

        <button onClick={handleAddTask}>
          <IoAddOutline />
        </button>
      </div>

      {/* Task Items */}
      <div className='h-full w-full'>
        {tasks.map((task) => (
          <SingleTask task={task} key={task.id} />
        ))}
      </div>
    </div>
  )
}
