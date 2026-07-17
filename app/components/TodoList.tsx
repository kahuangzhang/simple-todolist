import { ITask } from "@/Tasks/Tasks"
import Task from "./Task"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"


interface TodoListProps  {
    tasks: ITask[]
}

const TodoList:React. FC<TodoListProps> = ({ tasks }) =>{
    return <div className="overflow-x-auto rounded-lg border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </TableBody>
    </Table>
  </div>
}

export default TodoList