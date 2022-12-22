import React, { useEffect, useState } from "react";

const Home = () => {
  const [list, setList] = useState([
    {task: "demo"}
  ]);
  const [task, setTask] = useState("");
  const [updating, setUpdating] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!task) {
      return alert("please fill the task field");
    }
    console.log(task)
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
      const data = await res.json();
      console.log(data);
      if (res.status === 400 || !data) {
        return alert("Task creation failed");
      } else {
        return alert("Task created successfully");
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
        return alert("Delete failed");
      } else {
        return alert("Delete success");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!task) {
      return alert("please fill the task field");
    }
    try {
      const id = e._id;
      const res = await fetch(`/${id}/updatetask`, {
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
        return alert("Update failed");
      } else {
        return alert("Update success");
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

  const initiateUpdate = () => {
    setUpdating(!updating);
  }

  return (
    <div class="w-[450px] mx-auto mt-[3rem]">
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
                <li class="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
                  {e.task}
                  <span
                    onClick={() => {
                      initiateUpdate(e);
                    }}
                  >
                    UPD
                  </span>
                  <span
                    onClick={() => {
                      handleDelete(e);
                    }}
                  >
                    DEL
                  </span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
