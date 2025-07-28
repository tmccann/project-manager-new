import { DeleteTaskData } from "../components/ProjectDisplayPage/Task/Task";
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
  const { projectId, taskId } = deleteTaskData;
  const updatedProjects = projects.map((proj) => {
    if (proj.id === projectId) {
      return {
        ...proj,
        tasks: proj.tasks.filter((tasks) => tasks.id !== taskId),
      };
    }
    return proj;
  });
  return updatedProjects;
};
