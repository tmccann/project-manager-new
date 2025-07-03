import NoProject from "./components/NoProject/NoProject";

export default function App() {
  const onAddProject = () => {
    console.log("add button clicked");
  };
  return (
    <div>
      <NoProject hasProjects={true} onAddProject={onAddProject} />
    </div>
  );
}
