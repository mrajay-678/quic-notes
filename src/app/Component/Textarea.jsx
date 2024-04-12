"use client";

import React, { useEffect, useState } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import Toster from "./Toster";
import dynamic from "next/dynamic";

const Textarea = ({ setSaveTodo }) => {
  const [value, setValue] = useState("");
  const [toster, setToster] = useState(false);
  const [todoName, settodoName] = useState("");
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const currentTodo = localStorage.getItem("currentTodo");
    const currentTodoName = localStorage.getItem("currentTodoName");
    if (currentTodo || currentTodoName) {
      setValue(currentTodo);
      settodoName(currentTodoName);
    }
    // const SavedTodo = localStorage.getItem("SavedTodo");
    // SavedTodo && setTodo([...SavedTodo]);
    // localStorage.setItem("SavedTodo", SavedTodo);
  }, []);
  let formHandel = e => {
    e.preventDefault();
    setTodo([...todo, { name: todoName, todo: value }]);
    localStorage.setItem("SavedTodo", todo);
    setSaveTodo(todo);
  };
  useEffect(() => {
    let timeoutId = setTimeout(() => {
      localStorage.setItem("currentTodo", value);
      localStorage.setItem("currentTodoName", todoName);
      setToster(true);
    }, 4000);
    return () => {
      setToster(false);
      clearTimeout(timeoutId);
    };
  }, [value, todoName]);

  return (
    <form onSubmit={formHandel}>
      <div className={`toster-outer transition-all duration-[2s] ${toster && "opacity-0"}`}>{toster && <Toster />}</div>
      <div className="my-6 mr-5">
        <label
          htmlFor="large-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          NAME TASK
        </label>
        <input
          value={todoName}
          onInput={e => settodoName(e.target.value)}
          type="text"
          id="large-input"
          className="block w-full  p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:"
        />
      </div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        className="bg-gray-700 text-blue-50 my-5 mr-5 rounded"
      />
      <button
        type="submit"
        className=" border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  "
      >
        Submit
      </button>
    </form>
  );
};

export default Textarea;
