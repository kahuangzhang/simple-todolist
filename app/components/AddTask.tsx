"use client"

import { addTodo } from "@/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { CirclePlus } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { z } from "zod"
import Modal from "./Modal"
import {
  useMutation,
  useQueryClient
} from "@tanstack/react-query"


const todoSchema = z.object({
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

type TodoFormValues = z.infer<typeof todoSchema>

const AddTask = () => {

  const [modalOpen, setModalOpen] = useState(false)
  const queryClient = useQueryClient()

  const addTodoMutation = useMutation({
    mutationFn: addTodo,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["todos"],
      })
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      text: "",
      description: "",
    },
  })

  const handleSubmitNewTodo = async (
    values: TodoFormValues
  ) => {
    try {
      await addTodoMutation.mutateAsync({
        id: uuidv4(),
        text: values.text,
        description: values.description,
      })

      reset()
      setModalOpen(false)
    } catch (error) {
      console.error("Failed to add todo:", error)
    }
  }

  const handleCloseModal = (open: boolean) => {
    setModalOpen(open)

    if (!open) {
      reset()
    }
  }

  return (
    <div>
      <Button
         type="button"
         onClick={() => setModalOpen(true)}
       >
         Add new task
         <CirclePlus />
      </Button>

      <Modal
        modalOpen={modalOpen}
        setModalOpen={handleCloseModal}
      >
        <form
          onSubmit={handleSubmit(handleSubmitNewTodo)}
          noValidate
        >
          <h3 className="text-lg font-bold">
            Add New Task
          </h3>

          <div className="mt-4 space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="text"
                className="text-sm font-medium"
              >
                Title
              </label>

              <Input
                id="text"
                type="text"
                placeholder="Enter the todo title"
                aria-invalid={Boolean(errors.text)}
                aria-describedby={
                  errors.text ? "text-error" : undefined
                }
                {...register("text")}
              />

              {errors.text && (
                <p
                  id="text-error"
                  className="text-sm text-destructive"
                >
                  {errors.text.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium"
              >
                Description
              </label>

              <Textarea
                id="description"
                placeholder="Add more details"
                rows={4}
                aria-invalid={Boolean(errors.description)}
                aria-describedby={
                  errors.description
                    ? "description-error"
                    : undefined
                }
                {...register("description")}
              />

              {errors.description && (
                <p
                  id="description-error"
                  className="text-sm text-destructive"
                >
                  {errors.description.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={addTodoMutation.isPending}
            > 
              {addTodoMutation.isPending
                ? "Submitting..."
                : "Add New Task"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddTask