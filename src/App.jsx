import React, { useEffect, useState } from "react";

const App = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  const [edit, setEdit] = useState(-1);

  // Value get from input:

  const inputData = (e) => {
    setValue(e.target.value);
  };

  // Add Button Action:

  const btnHandle = (e) => {
    e.preventDefault();
    localStorage.setItem("todos", JSON.stringify([...todos, value]));
    setTodos([...todos, value]);
    setValue("");
  };

  // Save Button Action:

  const saveHandle = () => {
    setTodos([...todos.map((item, i) => (edit == i ? value : item))]);
    localStorage.setItem(
      "todos",
      JSON.stringify([...todos.map((item, i) => (edit == i ? value : item))])
    );
    setValue("");
    setEdit(-1);
  };

  // Delete Button Action:
  const dltHandle = () => {
    setTodos([]);
    localStorage.setItem("todos", []);
    setEdit(-1);
  };

  // Edit Button Action:
  const editBtn = (value, i) => {
    setEdit(i);
    setValue(value);
  };

  // Local Storage:

  useEffect(() => {
    let localData = localStorage.getItem("todos");
    localData = localData ? JSON.parse(localData) : [];
    setTodos(localData);
  }, []);

  // Single Input Todo Delete
  const singleDlt = (i) => {
    const temp = todos.filter((item, index) => index !== i);
    localStorage.setItem("todos", JSON.stringify(temp));
    setTodos(temp);
    setEdit(-1);
  };

  return (
    <>
      <div className="w-[90%] h-[80px] py-[10px] mx-auto flex justify-center items-center border-b-[2px] border-solid border-white ">
        <h1 className="text-5xl text-white font-extrabold text-center tracking-wider cursor-pointer">
          TODO LIST APP
        </h1>
      </div>
      <div className="grid place-content-center p-9  ">
        <div className="flex flex-col gap-7 w-[50rem] h-[30rem] border-[2px] border-solid border-white rounded-md bg-gray-900 py-10 ">
          <div className="flex justify-center items-center gap-4">
            <input
              type="text"
              name="text"
              value={value}
              placeholder="Write here..."
              autoComplete="off"
              onChange={inputData}
              className="w-[25rem] h-auto px-[.5rem] py-[.5rem] ease-linear duration-300 border-[1px] border-solid border-slate-700 outline-none rounded-sm  focus:border-blue-800 focus:outline-none"
            />
            {edit < 0 ? (
              <button
                onClick={btnHandle}
                className="px-[2rem] py-[.5rem] bg-slate-600 text-amber-100 outline-none border-0 cursor-pointer ease-linear duration-500 rounded-sm hover:bg-blue-800 hover:text-white"
              >
                Add
              </button>
            ) : (
              <button
                onClick={saveHandle}
                className="px-[2rem] py-[.5rem] bg-slate-600 text-amber-100 outline-none border-0 cursor-pointer ease-linear duration-500 rounded-sm hover:bg-blue-800 hover:text-white"
              >
                Save
              </button>
            )}
            <button
              onClick={dltHandle}
              className="px-[2rem] py-[.5rem] bg-slate-600 text-amber-100 outline-none border-0 cursor-pointer ease-linear duration-500 rounded-sm hover:bg-blue-800 hover:text-white"
            >
              Delete All
            </button>
          </div>
          <ul className="w-[83%] mx-auto  flex flex-col gap-3 justify-start">
            {todos?.map((item, i) => (
              <div
                key={i}
                className=" w-[70%] flex justify-between items-center  gap-5 px-2"
              >
                <li className="w-[100%] h-[2rem] text-white text-lg border-b-[1px] border-solid border-gray-500 pb-[.5rem]">
                  {item}
                </li>
                <div className="flex gap-3">
                  <button
                    onClick={() => editBtn(item, i)}
                    className="px-[1rem] py-[.2rem] bg-slate-600 text-amber-100 outline-none border-0  cursor-pointer ease-linear duration-500 rounded-sm hover:bg-blue-800 hover:text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => singleDlt(i)}
                    className="px-[1.2rem] py-[.5rem] bg-slate-600 text-amber-100  outline-none border-0 cursor-pointer ease-linear duration-500 rounded-sm hover:bg-blue-800 hover:text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
