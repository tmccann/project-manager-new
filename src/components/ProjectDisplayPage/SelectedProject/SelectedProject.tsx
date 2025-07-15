export type ProjectData = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
};
export type SelectedProjectProps = {
  projectData: ProjectData;
  handleDelete: (id: string) => void;
};

const SelectedProject = ({
  projectData,
  handleDelete,
}: SelectedProjectProps) => {
  return (
    <header>
      <div>
        {/* display title and delete button */}
        {/* delete button should pass project id*/}
        <h1>{projectData.title}</h1>
        <button onClick={() => handleDelete(projectData.id)}>Delete</button>
      </div>
      {/* display due date */}
      <p>{projectData.dueDate}</p>
      {/* display discription  */}
      <p>{projectData.description}</p>
    </header>
  );
};

export default SelectedProject;
