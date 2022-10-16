import axios from "axios";
import { useState } from "react";
import Checkbox from "./checkbox";

export default function Form({ reloadTodos }) {
  const [text, setText] = useState("");
  const [link, setLink] = useState("");

  const createTodo = (event) => {
    event.preventDefault();

    if (!text) return;

    axios.post("/api/todos/create", { text, link }).then(() => {
      setText("");
      setLink("");
      reloadTodos();
    });
  };

  return (
    <form
      className="w-full flex items-center bg-white dark:bg-gray-800 rounded-md px-7 pt-1 mt-7 sm:mt-12 sm:h-12 space-x-1 shadow"
      onSubmit={createTodo}
    >
      <div className="flex flex-col w-full">
        <input
          type="text"
          className="flex-1 w-full border-none text-xs sm:text-base bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-0"
          placeholder="Title"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <div className="h-[1px] bg-gray-300" />
        <input
          type="text"
          className="flex-1  w-full border-none text-xs sm:text-base bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-0"
          placeholder="Link"
          value={link}
          onChange={(event) => setLink(event.target.value)}
        />
        <div className="h-[1px] bg-gray-300" />
        <button className="flex-1 w-full bg-blue-500 rounded shadow-sm text-white my-2">ok</button>
      </div>
    </form>
  );
}
