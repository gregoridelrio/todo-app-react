import { useEffect, useState } from "react";
import { createTodo, getTodos } from "../api/todoApi";
import type { Todo } from "../types/todo";

function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  async function handleCreateTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const newTodo = await createTodo({
        title,
        description,
        priority,
      });

      setTodos((currentTodos) => [...currentTodos, newTodo]);
      setTitle("");
      setDescription("");
      setPriority("medium");
      setError(null);
    } catch {
      setError("No se pudo crear la tarea.");
    }
  }

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
      <form onSubmit={handleCreateTodo}>
        <div>
          <label htmlFor="title">Título</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="priority">Prioridad</label>
          <select
            id="priority"
            value={priority}
            onChange={(event) =>
              setPriority(event.target.value as "low" | "medium" | "high")
            }
          >
            <option value="low">Baja</option>
            <option value="medium">Media</option>
            <option value="high">Alta</option>
          </select>
        </div>

        <button type="submit">Crear tarea</button>
      </form>

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