import { ITask } from "./Tasks/Tasks"
const baseUrl = "http://localhost:3001"

export const getAllTodos = async (): Promise<ITask[]> => {
    const response = await fetch(`${baseUrl}/tasks`)
  
    if (!response.ok) {
      throw new Error("Failed to get todos")
    }
  
    return response.json()
  }
  
  export const addTodo = async (
    todo: ITask
  ): Promise<ITask> => {
    const response = await fetch(`${baseUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
  
    if (!response.ok) {
      throw new Error("Failed to add todo")
    }
  
    return response.json()
  }
  
  export const editTodo = async (
    todo: ITask
  ): Promise<ITask> => {
    const response = await fetch(
      `${baseUrl}/tasks/${todo.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      }
    )
  
    if (!response.ok) {
      throw new Error("Failed to edit todo")
    }
  
    return response.json()
  }
  
  export const deleteTodo = async (
    id: string
  ): Promise<void> => {
    const response = await fetch(
      `${baseUrl}/tasks/${id}`,
      {
        method: "DELETE",
      }
    )
  
    if (!response.ok) {
      throw new Error("Failed to delete todo")
    }
  }