export interface Todo {
  id: number;
  userId: number;
  title: string;
  description: string | null;
  completed: boolean;
  priority: "low" | "medium" | "high";
}