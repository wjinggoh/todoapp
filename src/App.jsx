import { useEffect, useState } from "react" //imports React hooks
import { NewTodoForm } from "./NewTodoForm" //Import NewTodoForm component
import "./styles.css"
import { TodoList } from "./TodoList" //import TodoList component

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS") //get saved todos from localStorage
    if (localValue == null) return []
    //if no saved data, return an empty array

    return JSON.parse(localValue)
    //convert stored Json String back into an array
  })

  //useEffect Hook => cannot render hooks conditionally(example: if xx = true/ if xx > 0)
  useEffect(() => {
    //run this function everytime the properties inside the set of array changed
    localStorage.setItem("ITEMS", JSON.stringify(todos))//convert value/objects/arrays into strings
  }, [todos])

  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  )
}