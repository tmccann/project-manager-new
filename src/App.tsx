import { useState } from "react";
import NoProject from "./components/NoProject/NoProject";
import ProjectForm from "./components/ProjectForm/ProjectForm";
import ProjectDisplayPage from "./components/ProjectDisplayPage/ProjectDisplayPage";
import { Project, TaskItem, PageState } from "./types/types";
import { TaskDeleteProps } from "./components/ProjectDisplayPage/Task/Task";
import Sidebar from "./components/Sidebar/Sidebar";

export default function App() {
  // type PageState =
  // | { view: "NoProject" }
  // | { view: "Form" }
  // | { view: "Project"; projectId: string }
  // | { view: "NotFound" };

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
  const [pageState, setPageState] = useState<PageState>({ view: "NoProject" });

  const onAddProject = () => {
    setPageState({ view: "Form" });
  };

  const getSelectedProject = (selectedProjectId: string) => {
    !isNaN(Number(selectedProjectId))
      ? setPageState({ view: "Project", projectId: selectedProjectId })
      : setPageState({ view: "NotFound" });
  };
  // getSelectedProject("3");
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

  let content;
  if (pageState.view === "NoProject" && projects.length > 0) {
    content = <NoProject hasProjects={true} onAddProject={onAddProject} />;
  } else if (pageState.view === "NoProject" && projects.length === 0) {
    content = <NoProject hasProjects={false} onAddProject={onAddProject} />;
  } else if (pageState.view === "Form") {
    content = <ProjectForm handleSubmit={handleSubmit} />;
  } else if (pageState.view === "Project") {
    const project = projects.find((proj) => proj.id === pageState.projectId);
    if (project) {
      content = (
        <ProjectDisplayPage
          project={project}
          handleProjectDelete={handleProjectDelete}
          handleAddTask={handleAddTask}
          handleTaskDelete={handleTaskDelete}
        />
      );
    } else {
      console.log("page 404");
    }
  } else {
    console.log("page 404");
  }

  return (
    <main className=" h-screen flex mt-8 gap-8">
      <Sidebar
        projects={projects}
        getSelectedProject={getSelectedProject}
        onAddProject={onAddProject}
      />
      {content}
    </main>
  );
}
