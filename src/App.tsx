import NoProject from "./components/NoProject/NoProject";
import ProjectForm from "./components/ProjectForm/ProjectForm";

const ProjectFormData = {
  title: "",
  description: "",
  dueDate: "",
};

export default function App() {
  const onAddProject = () => {
    console.log("add button clicked");
  };

  const handleSubmit = () => {
    console.log("ubmitted");
  };

  return (
    <div>
      {/* <NoProject hasProjects={true} onAddProject={onAddProject} /> */}
      <ProjectForm
        handleSubmit={handleSubmit}
        ProjectFormData={ProjectFormData}
      />
    </div>
  );
}
