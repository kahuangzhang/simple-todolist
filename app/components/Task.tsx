"use client"

import type { ITask } from "@/Tasks/Tasks"
import { deleteTodo, editTodo } from "@/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  TableCell,
  TableRow
} from "@/components/ui/table"
import { useRouter } from "next/navigation"
import {
  useState,
  type SubmitEventHandler
} from "react"
import { CiEdit, CiTrash } from "react-icons/ci"
import Modal from "./Modal"

interface TaskProps {
  task: ITask
}

const Task = ({ task }: TaskProps) => {
  const router = useRouter()

  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalDeleted, setOpenModalDeleted] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(task.text)

  const handleSubmitEditTodo:
    SubmitEventHandler<HTMLFormElement> = async (event) => {
      event.preventDefault()

      await editTodo({
        id: task.id,
        text: taskToEdit
      })

      setOpenModalEdit(false)
      router.refresh()
    }

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id)

    setOpenModalDeleted(false)
    router.refresh()
  }

  return (
    <TableRow>
      <TableCell>
        {task.text}
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Edit task"
            onClick={() => setOpenModalEdit(true)}
          >
            <CiEdit size={20} />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Delete task"
            onClick={() => setOpenModalDeleted(true)}
          >
            <CiTrash
              className="text-destructive"
              size={20}
            />
          </Button>
        </div>

        <Modal
          modalOpen={openModalEdit}
          setModalOpen={setOpenModalEdit}
        >
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="text-lg font-bold">
              Edit Task
            </h3>

            <div className="mt-4 space-y-4">
              <Input
                type="text"
                value={taskToEdit}
                onChange={(event) =>
                  setTaskToEdit(event.target.value)
                }
                placeholder="Edit task"
              />

              <Button type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Modal>

        <Modal
          modalOpen={openModalDeleted}
          setModalOpen={setOpenModalDeleted}
        >
          <div>
            <h3 className="text-lg font-semibold">
              Are you sure you want to delete this task?
            </h3>

            <div className="mt-4 flex justify-end">
              <Button
                type="button"
                variant="destructive"
                onClick={() => handleDeleteTask(task.id)}
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal>
      </TableCell>
    </TableRow>
  )
}

export default Task