import NoProject from "./components/NoProject/NoProject";
import ProjectForm from "./components/ProjectForm/ProjectForm";

export default function App() {
  const onAddProject = () => {
    console.log("add button clicked");
  };

  const handleSubmit = () => {
    console.log("submitted");
  };

  return (
    <div>
      {/* <NoProject hasProjects={true} onAddProject={onAddProject} /> */}
      <ProjectForm handleSubmit={handleSubmit} />
    </div>
  );
}
