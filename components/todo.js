import axios from "axios";
import Checkbox from "./checkbox";
import CrossIcon from "../icons/cross";
import { LinkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Todo({ todo, reloadTodos, admin }) {
  const toggleCompleted = () => {
    axios
      .post("/api/todos/update", {
        id: todo._id,
        text: todo.text,
        link: todo.link,
        completed: !todo.completed,
      })
      .then(reloadTodos);
  };

  const deleteTodo = () => {
    axios.post("/api/todos/delete", { id: todo._id }).then(reloadTodos);
  };

  return (
    <div className="flex justify-between space-x-3 bg-white dark:bg-gray-800 shadow-sm py-4 px-6 border-b dark:border-gray-700 group">
      <Checkbox completed={todo.completed} toggleCompleted={toggleCompleted} />
      <a href={todo.link} target="__blank" className="w-full flex justify-between items-center space-x-3">

        <p
          className={`flex-1 text-sm group-hover:text-blue-500 text-gray-900 dark:text-gray-100 ${todo.completed && "line-through text-gray-400 dark:text-gray-500"
            }`}
        >
          {todo.text}
          {/* {todo.link} */}
        </p>
        <LinkIcon className="h-6 w-6 group-hover:text-blue-500" />
      </a>
      {admin && (
        <button
          aria-label="Delete Todo"
          className="focus:outline-none"
          type="button"
          onClick={deleteTodo}
        >
          <CrossIcon />
        </button>
      )}
    </div>
  );
}
