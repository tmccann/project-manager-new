import { DeleteTaskData } from "../components/ProjectDisplayPage/Task/Task";
import { ProjectFormData } from "../components/ProjectForm/types";
import { Project } from "../types/types";

type WithId = { id: string };
type addTaskToProject = {
  projects: Project[];
  projectId: string;
  description: string;
};

type DeleteTaskFromProjectArgs = {
  deleteTaskData: DeleteTaskData;
  projects: Project[];
};

type NewProject = {
  projects: Project[];
  addProjectData: ProjectFormData;
};

type DeleteProjectArgs = {
  projects: Project[];
  id: string;
};
export const generateNextId = (array: WithId[]): string => {
  if (array.length === 0) return "1";

  const idAsNumber = Number(array[array.length - 1].id);
  const nextId = idAsNumber + 1;

  return nextId.toString();
};

export const addTaskToProject = ({
  projects,
  projectId,
  description,
}: addTaskToProject): Project[] => {
  const updatedProjects = projects.map((proj) => {
    if (proj.id === projectId) {
      const nextId = generateNextId(proj.tasks);
      const newTask = {
        projectId: projectId,
        id: nextId,
        description: description,
      };
      return {
        ...proj,
        tasks: [...proj.tasks, newTask],
      };
    }
    return proj;
  });
  return updatedProjects;
};

export const deleteTaskFromProject = ({
  projects,
  deleteTaskData,
}: DeleteTaskFromProjectArgs): Project[] => {
  const { projectId, id } = deleteTaskData;
  const updatedProjects = projects.map((proj) => {
    if (proj.id === projectId) {
      return {
        ...proj,
        tasks: proj.tasks.filter((tasks) => tasks.id !== id),
      };
    }
    return proj;
  });
  return updatedProjects;
};

export const createNewProject = ({ projects, addProjectData }: NewProject) => {
  const { title, description, dueDate } = addProjectData;
  const newId = generateNextId(projects);
  const newProject: Project = {
    id: newId.toString(),
    title: title,
    description: description,
    dueDate: dueDate,
    tasks: [],
  };
  return newProject;
};

export const deleteProject = ({
  projects,
  id,
}: DeleteProjectArgs): Project[] => {
  const newProjects = projects.filter((project) => project.id !== id);
  return newProjects;
};
