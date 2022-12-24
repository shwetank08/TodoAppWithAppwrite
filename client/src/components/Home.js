import React, { useEffect, useState } from "react";

import account from "../appwrite/appwriteConfig";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  PencilSquare,
  XSquareFill,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  const [list, setList] = useState([
    {task: "demo"}
  ]);
  const [task, setTask] = useState("");
  const [updating, setUpdating] = useState(false);
  const [userId, setUserId] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!task) {
      return alert("please fill the task field");
    }
    
    try {
      const res = await fetch('/createtask', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task,
        }),
      });
      setTask("");

      const data = await res.json();
      console.log(data);
      if (res.status === 400 || !data) {
        return toast.warn('TASK CREATION FAILED', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      } else {
        return toast.success('TASK CREATED SUCCESSFULLY', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
    } catch (err) {
      console.log(err);
    }

  };
  const handleDelete = async (e) => {
    try {
      const id = e._id;
      console.log(id);
      const res = await fetch(`/${id}/deletetask`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 400 || !data) {
        return toast.warn('TASK DELETION FAILED', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      } else {
        return toast.success('TASK DELETED', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(!updating);
    setTask("");
    setUserId("");
    try {
      const res = await fetch(`/${userId}/updatetask`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          task,
        }),
      });
      const data = await res.json();
      if (res.status === 400 || !data) {
        return toast.warn('UPDATE FAILED', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      } else {
        return toast.success('UPDATE SUCCESS', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
      }
    } catch (err) {
      console.log(err);
    }
    
  };

  const handleGET = async () => {
    try {
      const res = await fetch("/gettask", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await res.json();
      const { tasks } = data;
      setList(tasks);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGET();
  }, [list]);

  const initiateUpdate = (e) => {
    setUpdating(true);
    setTask(e.task);
    setUserId(e._id);
  }

  const handleLogout = () => {
    const promise = account.deleteSession('current');

    promise.then(function (response) {
        console.log(response); // Success
        return navigate('/api/u/login');
    }, function (error) {
        console.log(error); // Failure
        alert("logging out failed")
    });
  }

  return (
    <>
    <ToastContainer/>
    <div class="w-[450px] mx-auto mt-[3rem]">
    <button onClick={handleLogout}>LOGOUT</button>
      <form class="w-full">
        <div class="flex items-center justify-center border-b border-teal-500 py-2">
          <input
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Feed the dog"
            value={task}
            onChange={(e)=>setTask(e.target.value)}
          />
          {updating?(
            <button
            class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
            onClick={(e) => {
              handleUpdate(e)
            }}
          >
            Update
          </button>
          ):(
            <button
            class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
            onClick={(e) => {
              handleSubmit(e)
            }}
          >
            Add
          </button>
          )
          }
        </div>
      </form>
      <div class="flex justify-center">
        <ul class="bg-white rounded-lg border border-gray-200 w-[500px] mt-[3rem] text-gray-900">
          {list &&
            list.map((e) => {
              return (
                <li class="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg flex justify-around">
                <div class="break-normal w-[400px]">{e.task}</div>  
                
                  <span
                    onClick={() => {
                      initiateUpdate(e);
                    }}
                  >
                    <PencilSquare/>
                  </span>
                  <span
                    onClick={() => {
                      handleDelete(e);
                    }}
                  >
                    <XSquareFill/>
                  </span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
    </>
  );
};

export default Home;
