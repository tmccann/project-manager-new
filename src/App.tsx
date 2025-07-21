import { useState } from "react";
import NoProject from "./components/NoProject/NoProject";
import ProjectForm from "./components/ProjectForm/ProjectForm";
import ProjectDisplayPage from "./components/ProjectDisplayPage/ProjectDisplayPage";
import { Project, TaskItem } from "./types/types";
import { TaskDeleteProps } from "./components/ProjectDisplayPage/Task/Task";

export default function App() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "demo 1",
      description: "this is first Project",
      dueDate: "07/28/2025",
      tasks: [
        { projectId: "1", taskId: "1", description: "test task" },
        { projectId: "1", taskId: "2", description: "test task 2" },
      ],
    },
  ]);

  const onAddProject = () => {
    console.log("add button clicked");
  };

  const selectedProject = (selectedProjectId: string) => {
    if (!selectedProjectId) {
      console.log("fail");
    } else {
      const project = projects.find((proj) => proj.id === selectedProjectId);
      return project;
    }
  };
  selectedProject("1");
  const handleProjectDelete = (id: string) => {
    console.log(id);
  };

  const handleSubmit = ({ title, description, dueDate }) => {
    console.log(
      `title: ${title} description: ${description} dueDate:${dueDate}`
    );
  };

  const handleAddTask = (task: TaskItem) => {
    console.log(task);
  };
  const handleTaskDelete = (data: TaskDeleteProps) => {
    const { projectId, taskId } = data;
    console.log(`projectId: ${projectId}  taskId: ${taskId}`);
  };

  return (
    <main className=" h-screen flex mt-8 gap-8">
      {/* <NoProject hasProjects={true} onAddProject={onAddProject} /> */}
      <ProjectForm handleSubmit={handleSubmit} />

      {/* <ProjectDisplayPage
        project={selectedProject("1")!}
        handleProjectDelete={handleProjectDelete}
        handleAddTask={handleAddTask}
        handleTaskDelete={handleTaskDelete}
      /> */}
    </main>
  );
}
