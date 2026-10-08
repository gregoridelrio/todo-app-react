import { useEffect, useState } from "react";
import { getTodos } from "../api/todoApi";
import type { Todo } from "../types/todo";

function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTodos()
      .then((todos) => {
        setTodos(todos);
      })
      .catch(() => {
        setError("No se pudieron cargar las tareas.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <h1>Mis tareas</h1>

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : todos.length === 0 ? (
        <p>No tienes tareas todavía.</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default TodosPage