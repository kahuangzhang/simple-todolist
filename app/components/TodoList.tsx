"use client"

import { getAllTodos } from "@/api"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import Task from "./Task"

const TodoList = () => {
  const {
    data: tasks = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getAllTodos,
  })

  if (isPending) {
    return <p>Loading tasks...</p>
  }

  if (isError) {
    return (
      <p className="text-destructive">
        {error.message}
      </p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TodoList