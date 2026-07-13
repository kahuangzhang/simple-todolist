"use client"
import { CiEdit, CiTrash } from "react-icons/ci";
import { ITask } from "@/Tasks/Tasks";
import { useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { editTodo, deleteTodo } from "@/api";

interface Taskprops{
    task: ITask
}


const Task: React.FC<Taskprops> = ({ task }) =>{
    const router = useRouter();
    const[openModalEdit, setOpenModalEdit] = useState(false);
    const[openModalDeleted, setOpenModalDeleted] = useState(false);
    const[taskToEdit, setTaskToEdit] = useState<string>(task.text)
    const handleSubmitEditTodo : React.FormEventHandler<HTMLFormElement> = async(e) => {
        e.preventDefault();
        await editTodo({
            id: task.id,
            text : taskToEdit,
        });
        setOpenModalEdit(false);
        router.refresh();
    }
    const handleDeleteTask = async (id:string) => {
        await deleteTodo(id);
        setOpenModalEdit(false);
        router.refresh();
    }


    return (
        <tr key={task.id}>    
            <td>{task.text}</td>
            <td  className="flex gap-10">
                <CiEdit onClick={() => setOpenModalEdit(true)} className="text-blue-500 cursor-pointer" size={25}/>
                <Modal modalOpen = {openModalEdit} setModalOpen = {setOpenModalEdit}>
                    <form onSubmit={handleSubmitEditTodo}>
                        <h3 className="text-lg font-bold">
                        Edit Task
                        </h3>
                        <div className="modal-action">
                            <input value={taskToEdit} onChange={e => setTaskToEdit(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
                            <button type="submit" className="btn">Submit</button>
                        </div>

                    </form>
                </Modal>
                <CiTrash onClick={() => setOpenModalDeleted(true)} className="text-red-500 cursor-pointer" size={25} />
                <Modal modalOpen = {openModalDeleted} setModalOpen = {setOpenModalDeleted}>
                    <form onSubmit={handleSubmitEditTodo}>
                        <h3 className="text-lg ">
                        Are you sure you want to delate this task?
                        </h3>
                        <div className="modal-action">
                           
                            <button onClick={() => handleDeleteTask(task.id)} className="btn btn-error mx-auto block">Yes</button>
                        </div>

                    </form>
                </Modal>
                
             
            </td>
        </tr>
     
     )
    

}

export default Task