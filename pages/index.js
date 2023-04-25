import { useEffect, useState } from "react";
import Head from "next/head";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import axios from "axios";
import Form from "../components/form";
import Todo from "../components/todo";
import ToggleThemeButton from "../components/toggle-theme-button";
import Nav from "../components/nav";
import Container from "../components/container";

export default function Home() {
  const [status, setStatus] = useState("loading");
  const [todos, setTodos] = useState(null);
  const [allTodos, setAllTodos] = useState(null);
  const [activeTodos, setActiveTodos] = useState(null);
  const [completedTodos, setCompletedTodos] = useState(null);

  useEffect(() => {
    let cancelled = false;

    if (status !== "loading") return;

    axios("/api/todos").then((res) => {
      if (cancelled) return;

      if (res.status !== 200) {
        console.error("Error loading todos!");
        console.error(res);
        return;
      }

      setTodos(res.data.todos);
      setStatus("loaded");
    });

    return () => {
      cancelled = true;
    };
  }, [status]);

  useEffect(() => {
    setAllTodos(todos);
    setActiveTodos(todos?.filter((todo) => !todo.completed));
    setCompletedTodos(todos?.filter((todo) => todo.completed));
  }, [status]);

  const reloadTodos = () => setStatus("loading");

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodos(items);
  };

  return (
    <>
      <Head>
        <title>Pauls Wunschliste</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>

      <div className="flex flex-col font-body min-h-screen">
        <header className="bg-mobile-light bg-cover bg-center min-h-[400px] sm:min-h-[400px] flex justify-end relative z-0">
          {/* <Container> */}
          <section
            className={`flex items-end flex-col justify-end max-w-md mx-auto px-6 py-10 sm:py-16`}
          >
            <div className="flex justify-between">
              <h1 className="z-40 text-3xl sm:text-3xl text-white font-extrabold font-display drop-shadow-md md:drop-shadow-xl">
                Pauls Wunschliste
              </h1>
              {/* <ToggleThemeButton /> */}
            </div>
            {/* <Form reloadTodos={reloadTodos} /> */}
          </section>
          {/* </Container> */}
          <div className="absolute bottom-0 bg-gradient-to-t from-black/90 to-transparent h-28 w-full" />
        </header>
        <main className="flex-1 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 z-40">
          <Container>
            {/* <small className="text-gray-500 text-center my-3">
              Bei Wunscherfüllung bitte abhaken!
            </small> */}
            {todos ? (
              <ul className="-mt-16 sm:-mt-28 rounded-t-md overflow-hidden shadow-lg">
                <li className="justify-between  bg-white dark:bg-gray-800 shadow-sm py-4 px-6 border-b dark:border-gray-700 text-sm">
                  Hier könnt ihr Paul einen Wunsch erfüllen.
                  Hakt den Eintrag bitte ab, sobald ihr ihn bestellt habt. 
                  <br />
                  <br />
                  <span className="italic">
                  Vielen Dank!
                  </span>
                </li>
                {todos.sort((x,y) => {return (x.completed === y.completed)? 0 : x.completed? 1 : -1}).map((todo, index) => (
                  <li key={index}>
                    <Todo todo={todo} reloadTodos={reloadTodos} />
                  </li>
                ))}
              </ul>
            ) : (
              <div>Loading...</div>
            )}

            <Nav
              todos={{
                all: allTodos,
                active: activeTodos,
                completed: completedTodos,
              }}
              setTodos={setTodos}
              reloadTodos={reloadTodos}
            />

          </Container>
        </main>
        <footer className="bg-gray-100 dark:bg-gray-900 text-gray-500 text-center">
          <small>
            © 2022 &nbsp;
            <a
              className="underline"
              href="https://www.flxkpe.io"
              target="_blank"
            >
              flxkpe
            </a>
          </small>
        </footer>
      </div>
    </>
  );
}
