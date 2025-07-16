export type Project = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  tasks: TaskItem[];

};

export type TaskItem = {
  projectId: string;
  taskId: string;
  description: string;
};

