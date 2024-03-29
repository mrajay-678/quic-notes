"use client";

import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Textarea = () => {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState([""]);

  useEffect(() => {
    const currentTodo = localStorage.getItem("currentTodo");
    if (currentTodo) {
      setValue(currentTodo);
    }
  }, []);
  useEffect(() => {
    let timeoutId = setTimeout(() => {
      localStorage.setItem("currentTodo", value);
    }, 4000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [value]);
  let formHandel = e => {
    e.preventDefault();
    setTodo(...todo, value);
    console.log(todo);
    localStorage.setItem("SavedTodo", todo);

    console.log(e);
  };
  console.log(value);
  return (
    <form onSubmit={formHandel}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        className="bg-gray-700 text-blue-50 my-5 mr-5"
      />
      <button
        type="submit"
        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default Textarea;
