import React, { Fragment, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
const NavBar = () => {
  let projectList = JSON.parse(localStorage.getItem("projectList"));
  let projectComps;
  useEffect(() => {
  }, [projectComps]);
  const [open, setOpen] = useState(false);
  const [projectInput, setProjectInput] = useState("");
 
  const projectHandler = () =>{
    if (projectList !== null) {
      projectComps = projectList.map((project) => {
        return (
          <Link
            to={`/project/${project.projectName}`}
            className="block py-1.5 px-4 rounded hover:bg-primary hover:text-secondary"
          >
            {project.projectName}
          </Link>
        );
      });
    }
  }
  projectHandler();
  const handleAddition = () => {
    if (projectList === null) {
      projectList = [
        {
          projectName: projectInput,
          tasks: [],
        },
      ];
    } else {
      projectList.push(
        {
          projectName: projectInput,
          tasks: [],
        },
      );
    }
    localStorage.setItem("projectList",JSON.stringify(projectList));
    projectHandler();
    setOpen(false);
  };

  const cancelButtonRef = useRef(null);
  return (
    <div className="sidebar bg-secondary w-1/2 md:w-1/4 space-y-6 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 duration-200 ease-in-out">
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
                        Add Project
                      </Dialog.Title>
                      <div className="mt-2">
                        <form action="">
                          <div className="flex flex-col space-y-4">
                            <label>Project Name</label>
                            <input
                              type="text"
                              value={projectInput}
                              className="border border-secondary focus:border-secondary rounded-md p-3"
                              onInput={(e) => setProjectInput(e.target.value)}
                            />
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
                    onClick={handleAddition}
                  >
                    +Add
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <Link to="#" className="flex items-center space-x-2 ">
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
        <span className="text-2xl ">DoDo</span>
      </Link>
      <nav>
        {projectComps}
        <button
          className="block py-1.5 px-4 rounded hover:bg-primary hover:text-secondary"
          onClick={() => setOpen(true)}
        >
          +Add New Project
        </button>
      </nav>
    </div>
  );
};

export default NavBar;
