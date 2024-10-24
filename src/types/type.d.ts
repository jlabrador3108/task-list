export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface TaskItemProps {
  task: Task;
  completeTask: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
}

export interface TaskListProps {
  tasks: Task[];
  completeTask: (taskId: number) => void;
  deleteTask: (taskId: number) => void;
}

export interface AddTaskFormProps {
  addTask: (task: Task) => void;
}
