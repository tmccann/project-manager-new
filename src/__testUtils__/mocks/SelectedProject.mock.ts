const today = new Date().toLocaleDateString();
const formattedDate = new Date(today).toLocaleDateString("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});
export const mockData = {
  id: "1",
  title: "demo 1",
  description: "this is first Project",
  dueDate: formattedDate,
  tasks: [{ projectId: "1", taskId: "1", description: "test task" }],
};
