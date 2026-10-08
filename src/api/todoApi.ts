import { API_URL } from "../config/api";
import type { Todo } from "../types/todo";

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