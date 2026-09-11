"use client"

import type { ITask } from "@/Tasks/Tasks"
import { deleteTodo, editTodo } from "@/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Modal from "./Modal"

interface TaskProps {
  task: ITask
}

const editTodoSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or fewer"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(500, "Description must be 500 characters or fewer"),
})

type EditTodoFormValues = z.infer<typeof editTodoSchema>

const Task = ({ task }: TaskProps) => {
  const router = useRouter()

  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalDeleted, setOpenModalDeleted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<EditTodoFormValues>({
    resolver: zodResolver(editTodoSchema),
    defaultValues: {
      text: task.text,
      description: task.description ?? "",
    },
  })

  const handleOpenEditModal = () => {
    reset({
      text: task.text,
      description: task.description ?? "",
    })

    setOpenModalEdit(true)
  }

  const handleEditModalChange = (open: boolean) => {
    setOpenModalEdit(open)

    if (!open) {
      reset({
        text: task.text,
        description: task.description ?? "",
      })
    }
  }

  const handleSubmitEditTodo = async (
    values: EditTodoFormValues
  ) => {
    await editTodo({
      id: task.id,
      text: values.text,
      description: values.description,
    })

    setOpenModalEdit(false)
    router.refresh()
  }

  const handleDeleteTask = async () => {
    await deleteTodo(task.id)

    setOpenModalDeleted(false)
    router.refresh()
  }

  return (
    <TableRow>
      <TableCell className="font-medium">
        {task.text}
      </TableCell>

      <TableCell className="max-w-md whitespace-normal text-muted-foreground">
        {task.description || "No description"}
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`Edit ${task.text}`}
            onClick={handleOpenEditModal}
          >
            <Pencil />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={`Delete ${task.text}`}
            onClick={() => setOpenModalDeleted(true)}
          >
            <Trash2 />
          </Button>
        </div>

        <Modal
          modalOpen={openModalEdit}
          setModalOpen={handleEditModalChange}
        >
          <form
            onSubmit={handleSubmit(handleSubmitEditTodo)}
            noValidate
          >
            <h3 className="text-lg font-bold">
              Edit Task
            </h3>

            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor={`task-title-${task.id}`}
                  className="text-sm font-medium"
                >
                  Title
                </label>

                <Input
                  id={`task-title-${task.id}`}
                  type="text"
                  placeholder="Edit task title"
                  aria-invalid={Boolean(errors.text)}
                  aria-describedby={
                    errors.text
                      ? `task-title-error-${task.id}`
                      : undefined
                  }
                  {...register("text")}
                />

                {errors.text && (
                  <p
                    id={`task-title-error-${task.id}`}
                    className="text-sm text-destructive"
                  >
                    {errors.text.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`task-description-${task.id}`}
                  className="text-sm font-medium"
                >
                  Description
                </label>

                <Textarea
                  id={`task-description-${task.id}`}
                  placeholder="Edit task description"
                  rows={4}
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={
                    errors.description
                      ? `task-description-error-${task.id}`
                      : undefined
                  }
                  {...register("description")}
                />

                {errors.description && (
                  <p
                    id={`task-description-error-${task.id}`}
                    className="text-sm text-destructive"
                  >
                    {errors.description.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save changes"}
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
                onClick={handleDeleteTask}
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