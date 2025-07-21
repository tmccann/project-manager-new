import type { Project } from "../../../types/types";
export type SelectedProjectProps = {
  project: Project;
  handleProjectDelete: (id: string) => void;
};
const SelectedProject = ({
  project,
  handleProjectDelete,
}: SelectedProjectProps) => {
  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="border-b-2 border-stone-300">
      <div className=" flex justify-between">
        {/* display title and delete button */}
        {/* delete button should pass project id*/}
        <h1 className=" text-3xl font-bold text-stone-600 mb-2">
          {project.title}
        </h1>
        <button
          className="text-stone-600 hover:text-stone-950"
          onClick={() => handleProjectDelete(project.id)}
        >
          Delete
        </button>
      </div>
      {/* display due date */}
      <p className=" mb-4 text-stone-400">{formattedDate}</p>
      {/* display discription  */}
      <p className="text-stone-600 mb-8">{project.description}</p>
    </header>
  );
};
export default SelectedProject;
