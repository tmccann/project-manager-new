import type { Project } from "../../../App";
export type SelectedProjectProps = {
  project: Project;
  handleProjectDelete: (id: string) => void;
};

const SelectedProject = ({
  project,
  handleProjectDelete,
}: SelectedProjectProps) => {
  return (
    <header>
      <div>
        {/* display title and delete button */}
        {/* delete button should pass project id*/}
        <h1>{project.title}</h1>
        <button onClick={() => handleProjectDelete(project.id)}>Delete</button>
      </div>
      {/* display due date */}
      <p>{project.dueDate}</p>
      {/* display discription  */}
      <p>{project.description}</p>
    </header>
  );

export default SelectedProject;
