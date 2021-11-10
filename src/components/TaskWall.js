import React,{ Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/outline";
import { PencilIcon } from "@heroicons/react/outline";
import { useParams } from "react-router-dom";

const TaskWall = ({ match }) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const { name } = useParams();
  const [taskName, setTaskName] = useState("");
  const [taskNotes, setTaskNotes] = useState("");
  const [taskPriority, setTaskPriority] = useState("primary");

  let projectList = JSON.parse(localStorage.getItem("projectList"));
  const project = projectList.find((project) => project.projectName === name);
  let tasks = project.tasks;
  let taskComp;
  useEffect(() => {
  }, []);
  
  const taskRemover = (task)=>{
      tasks = tasks.filter((t)=>t.taskName!==task)
      projectList.forEach((project)=>{
        if(project.projectName===name){
          project.tasks = tasks;
        }
      });
      localStorage.setItem("projectList",JSON.stringify(projectList));
      window.location.reload();
  }
  let taskMaker = ()=>{  
  taskComp = tasks.map((task) => {
    return (
      <div className={`bg-${task.taskPriority} p-3 shadow-md rounded-2xl`}>
        <div className="flex justify-between items-center">
          <h2>{task.taskName}</h2>
          <div className="flex space-x-3">
            <button
              className={`p-2 shadow-md rounded-full ${
                task.taskPriority === "primary" ? "bg-secondary" : "bg-primary"
              }`}
              onClick={()=>taskRemover(task.taskName)}
            >
              <TrashIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        <p>{task.taskNotes}</p>
      </div>
    );
  })}
  taskMaker();
  const taskHandler = ()=>{
    tasks.push({
      "taskName":taskName,
      "taskNotes":taskNotes,
      "taskPriority":taskPriority,
    });
    projectList.forEach((project)=>{
      if(project.projectName===name){
        project.tasks = tasks;
      }
    });
    
    localStorage.setItem("projectList",JSON.stringify(projectList));
    setOpen(false);
    setTaskPriority("primary");
  }

  return (
    <div className="flex-1 p-10 bg-primary h-screen space-y-5">
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-primary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-primary px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Add Task
                      </Dialog.Title>
                      <div className="mt-2">
                        <form action="">
                          <div className="flex flex-col space-y-4">
                            <label>Task Name</label>
                            <input
                              type="text"
                              className="border border-secondary focus:border-secondary rounded-md p-3"
                              value={taskName}
                              onInput={(e)=>{setTaskName(e.target.value)}}
                            />
                            <label>Task Notes</label>
                            <input
                              type="text"
                              className="border border-secondary focus:border-secondary rounded-md p-8"
                              value={taskNotes}
                              onInput={(e)=>{setTaskNotes(e.target.value)}}
                            />
                            <label>Task Priority</label>
                            <select onChange={(e)=>{setTaskPriority(e.target.value)}}>
                                <option value="primary">Primary</option>
                                <option value="secondary">Secondary</option>
                            </select>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md px-4 py-2 bg-secondary sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={taskHandler}
                  >
                    +Add
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="flex justify-between p-5 shadow-lg rounded-xl">
        <h1 className="text-2xl font-semibold">{project.projectName}</h1>
        <button className="bg-secondary p-3 rounded-3xl shadow-md" onClick={()=>{setOpen(true)}}>
          +Add Task
        </button>
      </div>
      <div className="grid grid-cols-2 grid-rows-3 md:grid-cols-3 md:grid-rows-3 gap-4">
        {taskComp}
      </div>
    </div>
  );
};

export default TaskWall;
