type ProjectFormProps = {
  handleSubmit: () => void;
  ProjectFormData: {
    title: string;
    description: string;
    dueDate: string;
  };
};

const ProjectForm = ({ handleSubmit, ProjectFormData }: ProjectFormProps) => {
  return (
    <section>
      <form onSubmit={handleSubmit}>
        {" "}
        <div>
          {/* cancel button */}
          {/* save Button */}
        </div>
        {/* title Input */}
        {/* description */}
        {/*due date */}
      </form>
    </section>
  );
};

export default ProjectForm;
