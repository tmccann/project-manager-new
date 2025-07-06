import React, { useRef, useState } from "react";

type ProjectFormProps = {
  handleSubmit: () => void;
  // ProjectFormData: ProjectFormData;
};

type ProjectFormData = {
  title: string;
  description: string;
  dueDate: string;
};
const initialProjectFormData = {
  title: "",
  description: "",
  dueDate: "",
};
const ProjectForm = ({ handleSubmit }: ProjectFormProps) => {
  // create ref for title, description and dueDateInput
  const title = useRef(null);
  const description = useRef(null);
  const dueDate = useRef(null);

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <button type="button">Cancel</button>
          <button type="submit">Save</button>
        </div>
        {/* title Input */}
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" ref={title} />
        {/* description */}
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          ref={description}
        />
        {/*due date */}
        <label htmlFor="dueDate">Due Date</label>
        <input type="text" name="dueDate" id="dueDate" ref={dueDate} />
      </form>
    </section>
  );
};

export default ProjectForm;
