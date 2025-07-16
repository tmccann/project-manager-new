const today = new Date().toLocaleDateString();
export const mockData = {
  id: "1",
  title: "demo 1",
  description: "this is first Project",
  dueDate: today,
  tasks: [{ projectId: "1", taskId: "1", description: "test task" }],
};
