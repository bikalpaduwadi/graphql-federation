import { tasks } from './data.json';

export type Task = {
  id: string;
  name: string;
  priority: string;
  userId: string;
};

export type TasksApi = {
  getTasks: (limit?: number) => Task[];
  getTaskById: (id: string) => Task | null;
  getTasksByUserId: (id: string) => Task[];
};

const getTasks = (limit: number = 5) => tasks.slice(0, Math.min(tasks.length, limit));
const getTaskById = (id: string) => tasks.find((task) => task.id === id);
const getTasksByUserId = (userId: string) => tasks.filter((task) => task.userId === userId);

export const tasksApi = {
  getTasks,
  getTaskById,
  getTasksByUserId,
};
