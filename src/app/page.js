"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import TodoLIst from "./Component/TodoLIst";
import Textarea from "./Component/Textarea";

export default function Home() {
  const SavedTodo = localStorage.getItem("SavedTodo");
  const [saveTodo, setSaveTodo] = useState([SavedTodo]);

  return (
    <div className="flex gap-5 h-screen">
      <section className="w-3/12 bg-gray-700 h-screen">
        <TodoLIst todo={saveTodo} />
      </section>
      <section className="w-9/12">
        <Textarea setSaveTodo={setSaveTodo} />
      </section>
    </div>
  );
}
