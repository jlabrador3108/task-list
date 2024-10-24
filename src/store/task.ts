import { create } from "zustand";
import { type Task } from "../types/type";
import { persist } from "zustand/middleware";

interface State {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (taskId: number) => void;
  completeTask: (taskId: number) => void;
  loading: boolean;
  error: string | null;
  currentPage: number;
  fetchTasks: () => void;
  setCurrentPage: (page: number) => void;
  clearError: () => void;
}

export const TASKS_PER_PAGE = 8;

export const useTaskStore = create<State>()(
  persist(
    (set) => {
      return {
        tasks: [],
        loading: false,
        error: null,
        currentPage: 1,

        addTask: (task: Task) =>
          set((state) => ({
            tasks: [task, ...state.tasks],
          })),

        deleteTask: (taskId: number) =>
          set((state) => ({
            tasks: state.tasks.filter((item) => item.id !== taskId),
          })),

        completeTask: (taskId: number) => {
          set((state) => ({
            tasks: state.tasks.map((item) =>
              item.id === taskId
                ? { ...item, completed: !item.completed }
                : item
            ),
          }));
        },

        fetchTasks: async () => {
          set({ loading: true, error: null });
          try {
            const response = await fetch(
              "https://jsonplaceholder.typicode.com/todos"
            );
            const data = await response.json();
            set({ tasks: data, loading: false });
          } catch (error) {
            set({ error: "Error al obtener las tareas", loading: false });
            setTimeout(() => {
              set({ error: null });
            }, 5000);
          }
        },

        setCurrentPage: (page: number) => set({ currentPage: page }),

        clearError: () => set({ error: null }),
      };
    },
    {
      name: "taskList",
    }
  )
);
