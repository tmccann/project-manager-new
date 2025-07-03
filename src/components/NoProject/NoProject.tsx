type NoProjectProps = {
  onAddProject: () => void;
  hasProjects: boolean;
};

const NoProject = ({ onAddProject, hasProjects }: NoProjectProps) => {
  const createProject = "Create a new project to get started";
  return (
    <section>
      {/* turnery operator for if projects */}
      {hasProjects ? (
        // message if projects
        <div>
          <p>No project selected</p>
          <p>Select a project</p>
          <p>or</p>
          <p>{createProject}</p>
        </div>
      ) : (
        // message if none
        <div>
          <p>{createProject}</p>
        </div>
      )}
      {/* Show button: "Create New Project" */}
      <button onClick={onAddProject}>Create New Project</button>
    </section>
  );
};

export default NoProject;
