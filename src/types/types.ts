export interface Project {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  tasks: TaskItem[];
}

export interface TaskItem {
  taskId: string;
  projectId: string;
  description: string;
}
