import { Project } from "../../types/types";
import SelectedProject from "./SelectedProject/SelectedProject";
import Task, { DeleteTaskData } from "./Task/Task";

type ProjectDisplayPageProps = {
  project: Project;
  handleProjectDelete: (id: string) => void;
  handleAddTask: ({
    projectId,
    description,
  }: {
    projectId: string;
    description: string;
  }) => void;
  handleTaskDelete: (deleteTaskData: DeleteTaskData) => void;
};

const ProjectDisplayPage = ({
  project,
  handleProjectDelete,
  handleAddTask,
  handleTaskDelete,
}: ProjectDisplayPageProps) => {
  return (
    <section className="max-w-8/12 text-left pt-16">
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
