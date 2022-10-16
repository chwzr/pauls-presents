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
      className="w-full flex items-center bg-white dark:bg-gray-800 rounded-md max-w-md mx-auto px-7 mt-7 sm:mt-12 h-10 sm:h-12 space-x-1 shadow"
      onSubmit={createTodo}
    >
      <Checkbox disabled />
      <input
        type="text"
        className="flex-1 border-none text-xs sm:text-base bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-0"
        placeholder="Title"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <input
        type="text"
        className="flex-1  w-full border-none text-xs sm:text-base bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-0"
        placeholder="Link"
        value={link}
        onChange={(event) => setLink(event.target.value)}
      />
      <button className="flex-1 bg-blue-500 rounded shadow-sm text-white">ok</button>
    </form>
  );
}
