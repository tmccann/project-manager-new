export interface Project {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  tasks: [Task];
}

export interface Task {
  taskId: string;
  projectId: string;
  description: string;
}
