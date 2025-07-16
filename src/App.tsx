import { useState } from "react";
import NoProject from "./components/NoProject/NoProject";
import ProjectForm from "./components/ProjectForm/ProjectForm";
import ProjectDisplayPage from "./components/ProjectDisplayPage/ProjectDisplayPage";
import { Project, TaskItem } from "./types/types";

export default function App() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "demo 1",
      description: "this is first Project",
      dueDate: "07/28/2025",
      tasks: [{ projectId: "1", taskId: "1", description: "test task" }],
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

  const handleSubmit = () => {
    console.log("submitted");
  };

  const handleAddTask = (task: TaskItem) => {
    console.log(task);
  };
  const handleTaskDelete = (projectId: string, taskId: string) => {
    console.log(`projectId: ${projectId}  taskId: ${taskId}`);
  };

  return (
    <div>
      {/* <NoProject hasProjects={true} onAddProject={onAddProject} /> */}
      {/* <ProjectForm handleSubmit={handleSubmit} /> */}

      <ProjectDisplayPage
        project={selectedProject("1")!}
        handleProjectDelete={handleProjectDelete}
        handleAddTask={handleAddTask}
        handleTaskDelete={handleTaskDelete}
      />
    </div>
  );
}
