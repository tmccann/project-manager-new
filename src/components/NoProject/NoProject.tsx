import logo from "../../assets/no-projects.png";

type NoProjectProps = {
  onAddProject: () => void;
  hasProjects: boolean;
};

const NoProject = ({ onAddProject, hasProjects }: NoProjectProps) => {
  const createProject = "Create a new project to get started";
  return (
    <section className=" flex flex-col gap-1.5 pt-16">
      <div>
        <img className=" w-16 h-16 m-auto" src={logo} alt="" />
        <p className=" font-semibold text-2xl text-stone-500 ">
          No project selected
        </p>
      </div>

      {/* Turnery operator for if projects */}
      {hasProjects ? (
        // Message if projects
        <div className="flex flex-col text-stone-400 my-2">
          <p>Select a project or {createProject}</p>
        </div>
      ) : (
        // Message if none
        <div className="flex flex-col text-stone-400 my-2">
          <p>{createProject}</p>
        </div>
      )}
      {/* Show button: "Create New Project" */}
      <button
        className=" m-auto bg-stone-700 hover:bg-stone-600 text text-stone-400 hover:text-stone-200 transition-colors py-2 px-2 rounded-md mb-6 text-sm font-semibold"
        data-testid="NoProjectAddProject"
        onClick={onAddProject}
      >
        Create New Project
      </button>
    </section>
  );
};

export default NoProject;
