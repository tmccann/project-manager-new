import logo from "../../assets/no-projects.png";
import Button from "../ui/Buttons";

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
      <Button
        variant="secondary"
        autoMargin
        data-testid="NoProjectAddProject"
        onClick={onAddProject}
      >
        Create New Project
      </Button>
    </section>
  );
};

export default NoProject;
