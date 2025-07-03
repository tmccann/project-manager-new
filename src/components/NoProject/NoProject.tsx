type NoProjectProps = {
  onAddProject: () => void;
  hasProjects: boolean;
};

const NoProject = ({ onAddProject, hasProjects }: NoProjectProps) => {
  return (
    <div>
      NoProject
      {/* IF projects exist THEN
          Display message: "No project selected"
          Display message: "Select a project"
          Display message: "or"
          Display message: "Create a new project to get started"

          ELSE (no projects)
          Display message: "Create a new project to get started"

          Show button: "+ Create New Project"
          On click → call onStartAddProject()
 */}
    </div>
  );
};

export default NoProject;
