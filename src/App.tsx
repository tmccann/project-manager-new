import { useState } from "react";
import NoProject from "./components/NoProject/NoProject";
import ProjectForm from "./components/ProjectForm/ProjectForm";
import ProjectDisplayPage from "./components/ProjectDisplayPage/ProjectDisplayPage";
import Sidebar from "./components/Sidebar/Sidebar";
import { ProjectFormData } from "./components/ProjectForm/types";
import Tumbleweed404 from "./components/404/Tumblewedd404";

import { Project, PageState } from "./types/types";

import {
  addTaskToProject,
  createNewProject,
  deleteProject,
  deleteTaskFromProject,
} from "./utils/Generate";
import { DeleteTaskData } from "./components/ProjectDisplayPage/Task/Task";

export default function App() {
  const [projects, setProjects] = useState<Project[]>([]);

  const [pageState, setPageState] = useState<PageState>({
    view: "NoProject",
  });

  const onAddProject = () => {
    setPageState({ view: "Form" });
  };

  const handleProjectDelete = (id: string) => {
    const newProjects = deleteProject({ projects, id });
    setProjects(newProjects);
    setPageState({ view: "NoProject" });
  };

  //  If projectForm cancelled pageState set to {view: noProject}
  const onCancel = () => setPageState({ view: "NoProject" });

  const handleSubmit = (AddProjectData: ProjectFormData) => {
    const newProject = createNewProject({ projects, AddProjectData });
    setProjects([...projects, newProject]);
  };

  const getSelectedProject = (selectedProjectId: string) => {
    const projectIdAsNumber = Number(selectedProjectId);
    if (!isNaN(projectIdAsNumber)) {
      setPageState({ view: "Project", projectId: selectedProjectId });
    } else {
      setPageState({ view: "NotFound" });
    }
  };

  const handleAddTask = ({
    projectId,
    description,
  }: {
    projectId: string;
    description: string;
  }) => {
    const projectsAddTask = addTaskToProject({
      projects,
      projectId,
      description,
    });
    setProjects(projectsAddTask);
  };

  const handleTaskDelete = (deleteTaskData: DeleteTaskData) => {
    const projectsDeletedTask = deleteTaskFromProject({
      projects,
      deleteTaskData,
    });
    setProjects(projectsDeletedTask);
  };

  let content;
  if (pageState.view === "NoProject" && projects.length > 0) {
    content = <NoProject hasProjects={true} onAddProject={onAddProject} />;
  } else if (pageState.view === "NoProject" && projects.length === 0) {
    content = <NoProject hasProjects={false} onAddProject={onAddProject} />;
  } else if (pageState.view === "Form") {
    content = <ProjectForm handleSubmit={handleSubmit} onCancel={onCancel} />;
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
      content = <Tumbleweed404 />;
    }
  } else {
    content = <Tumbleweed404 />;
  }

  return (
    <main className="flex h-screen overflow-hidden">
      <Sidebar
        projects={projects}
        getSelectedProject={getSelectedProject}
        onAddProject={onAddProject}
      />
      <section className="flex-1 flex flex-col h-full overflow-hidden min-h-0 mt-8 mx-10 text-center">
        {content}
      </section>
    </main>
  );
}
