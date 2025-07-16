import type { TaskItem } from "../../types/types";
import { Project } from "../../types/types";
import SelectedProject from "./SelectedProject/SelectedProject";
import Task, { TaskDeleteProps } from "./Task/Task";

type ProjectDisplayPageProps = {
  project: Project;
  handleProjectDelete: (id: string) => void;
  handleAddTask: (task: TaskItem) => void;
  handleTaskDelete: (data: TaskDeleteProps) => void;
};

const ProjectDisplayPage = ({
  project,
  handleProjectDelete,
  handleAddTask,
  handleTaskDelete,
}: ProjectDisplayPageProps) => {
  return (
    <section>
      <SelectedProject
        project={project}
        handleProjectDelete={handleProjectDelete}
      />
      <Task
        handleAddTask={handleAddTask}
        handleTaskDelete={handleTaskDelete}
        tasks={project.tasks}
        projectId={project.id}
      />
    </section>
  );
};

export default ProjectDisplayPage;
