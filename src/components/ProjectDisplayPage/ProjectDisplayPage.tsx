import type { TaskItem } from "../../types/types";
import { Project } from "../../types/types";
import SelectedProject from "./SelectedProject/SelectedProject";
import Task from "./Task/Task";

type ProjectDisplayPageProps = {
  project: Project;
  handleProjectDelete: (id: string) => void;
  handleAddTask: (task: TaskItem) => void;
  handleTaskDelete: (projectId: string, taskId: string) => void;
};

const ProjectDisplayPage = ({
  project,
  handleProjectDelete,
  handleAddTask,
  handleTaskDelete,
}: ProjectDisplayPageProps) => {
  console.log(project);
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
