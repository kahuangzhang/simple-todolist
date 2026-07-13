"use client"

import React, { useState } from "react";
import Modal from "./Modal";
import { CiCirclePlus } from "react-icons/ci";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

const AddTask = () =>{
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [newTaskValue, setNewTaskValue] = useState<string>('')
    const handleSubmitNewTodo: React.FormEventHandler<HTMLFormElement> = async(e) => {
        e.preventDefault();
        await addTodo({
            id: uuidv4(),
            text : newTaskValue,
        });
        setNewTaskValue('')
        setModalOpen(false);
        router.refresh();
    }

    return <div>
       <button onClick={() => setModalOpen(true)} popoverTarget="my-modal-1" popoverTargetAction="show" className="btn btn-primary">
            Add new task<CiCirclePlus className="ml-2" size={20} />
        </button>
       <Modal modalOpen = {modalOpen} setModalOpen = {setModalOpen}>
              <form onSubmit={handleSubmitNewTodo}>
                <h3 className="text-lg font-bold">
                        Add New Task
                </h3>
          
      
                <input
                  type="text"
                  value={newTaskValue}
                  onChange={(e) => setNewTaskValue(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered mt-4 w-full"
                />
      
                <div className="modal-action">
                  <button
                    type="submit"
                    className="btn btn-primary mx-auto"
                  >
                    Submit
                  </button>
                </div>
              </form>
        </Modal>
    </div>
}

export default AddTask