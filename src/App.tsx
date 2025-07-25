import { useState } from "react";
import NoProject from "./components/NoProject/NoProject";
import ProjectForm from "./components/ProjectForm/ProjectForm";
import ProjectDisplayPage from "./components/ProjectDisplayPage/ProjectDisplayPage";
import { Project, TaskItem, PageState } from "./types/types";
import { TaskDeleteProps } from "./components/ProjectDisplayPage/Task/Task";
import Sidebar from "./components/Sidebar/Sidebar";
import { ProjectFormData } from "./components/ProjectForm/types";
import Tumbleweed404 from "./components/404/Tumblewedd404";

export default function App() {
  // type PageState =
  // | { view: "NoProject" }
  // | { view: "Form" }
  // | { view: "Project"; projectId: string }
  // | { view: "NotFound" };

  const [projects, setProjects] = useState<Project[]>([]);
  const [pageState, setPageState] = useState<PageState>({
    view: "NoProject",
  });

  const onAddProject = () => {
    setPageState({ view: "Form" });
  };

  //  if projectForm cancelled pafeState set to {view: noProject}
  const onCancel = () => setPageState({ view: "NoProject" });

  const handleSubmit = (data: ProjectFormData) => {
    const { title, description, dueDate } = data;
    const id = Number(projects[projects.length - 1].id) + 1;
    setProjects((prev) => {
      return [
        ...prev,
        {
          id: id.toString(),
          title: title,
          description: description,
          dueDate: dueDate,
          tasks: [],
        },
      ];
    });
  };

  const getSelectedProject = (selectedProjectId: string) => {
    !isNaN(Number(selectedProjectId))
      ? setPageState({ view: "Project", projectId: selectedProjectId })
      : setPageState({ view: "NotFound" });
  };
  // getSelectedProject("3");
  const handleProjectDelete = (id: string) => {
    const newProjects = projects.filter((project) => project.id !== id);
    setProjects(newProjects);
    setPageState({ view: "NoProject" });
  };

  const handleAddTask = (task: TaskItem) => {
    const { projectId } = task;
    const updatedProjects = projects.map((proj) => {
      // If this is the project we want to update
      if (proj.id === projectId) {
        // return a new project object, copying all existing props
        return {
          ...proj,
          //replacing `tasks` with a new array that includes the new task
          tasks: [...proj.tasks, task],
        };
      }
      // Otherwise, return the original project untouched
      return proj;
    });
    // set Project state to modified Projects  object
    setProjects(updatedProjects);
  };
  const handleTaskDelete = (data: TaskDeleteProps) => {
    const { projectId, taskId } = data;
    const updatedProjects = projects.map((proj) => {
      // If this is the project we want to update
      if (proj.id === projectId) {
        // return a new project object, copying all existing props
        return {
          ...proj,
          //replacing `tasks` with a new array that excluding deleted task
          tasks: proj.tasks.filter((tasks) => tasks.taskId !== taskId),
        };
      }
      // Otherwise, return the original project untouched
      return proj;
    });
    // set Project state to modified Projects  object
    setProjects(updatedProjects);
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
