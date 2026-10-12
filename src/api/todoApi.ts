import { API_URL } from "../config/api";
import type { CreateTodoInput, Todo } from "../types/todo";

export async function getTodos(): Promise<Todo[]> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/todos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch todos");
  }

  return response.json();
}

export async function createTodo(input: CreateTodoInput): Promise<Todo> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to create todo");
  }

  return response.json();
}