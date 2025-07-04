type ProjectFormProps = {
  handleSubmit: () => void;
  ProjectFormData: ProjectFormData;
};

type ProjectFormData = {
  title: string;
  description: string;
  dueDate: string;
};

const ProjectForm = ({ handleSubmit, ProjectFormData }: ProjectFormProps) => {
  const handleCancel = () => {
    console.log("cancelled");
  };

  return (
    <section>
      <form>
        <div>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleSubmit}>Save</button>
        </div>
        {/* title Input */}
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" />
        {/* description */}
        <label htmlFor="description">Description</label>
        <input type="text" name="description" id="description" />
        {/*due date */}
        <label htmlFor="dueDate">Due Date</label>
        <input type="text" name="dueDate" id="dueDate" />
      </form>
    </section>
  );
};

export default ProjectForm;
