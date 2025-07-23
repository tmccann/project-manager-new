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

export type PageState =
  | { view: "NoProject" }
  | { view: "Form" }
  | { view: "Project"; projectId: string }
  | { view: "NotFound" };
