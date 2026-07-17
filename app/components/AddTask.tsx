"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CirclePlus } from "lucide-react"
import React, { useState } from "react";
import Modal from "./Modal";
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
        <Button
        type="button"
        onClick={() => setModalOpen(true)}
        >
            Add new task
            <CirclePlus />
        </Button>
       <Modal modalOpen = {modalOpen} setModalOpen = {setModalOpen}>
              <form onSubmit={handleSubmitNewTodo}>
                <h3 className="text-lg font-bold">
                        Add New Task
                </h3>
          
      
                <Input
                    type="text"
                    value={newTaskValue}
                    onChange={(e) => setNewTaskValue(e.target.value)}
                    placeholder="Type here"
                    className="mt-4"
                />
      
                <div className="modal-action">
                    <Button type="submit">
                        Submit
                    </Button> 
                </div>
              </form>
        </Modal>
    </div>
}

export default AddTask