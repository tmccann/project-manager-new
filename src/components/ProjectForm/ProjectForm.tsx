import React, { useRef, useState } from "react";

type ProjectFormProps = {
  handleSubmit: (data: ProjectFormData) => void;
};

export type ProjectFormData = {
  title: string;
  description: string;
  dueDate: string;
};
const intialErrors = {
  title: false,
  description: false,
  dueDate: false,
};
const ProjectForm = ({ handleSubmit }: ProjectFormProps) => {
  const [errors, setErrors] = useState(intialErrors);
  // create ref for title, description and dueDateInput
  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const dueDate = useRef<HTMLInputElement>(null);

  // create validation for inputs
  const onValidText = (ref: React.RefObject<HTMLInputElement>) => {
    const textElement = ref.current;
    if (!textElement) return null;
    const val = textElement.value;
    return val.length >= 4 ? val : null;
  };
  const onValidateText = (ref: React.RefObject<HTMLInputElement>) => {
    const dateElement = ref.current;
    if (!dateElement) return null;
    const val = dateElement.value;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const enteredDate = new Date(val);
    return enteredDate >= today ? val : null;
  };

  const handleFormValidation = (e: React.FormEvent) => {
    e.preventDefault();
    const userTitle = onValidText(title);
    const userDescription = onValidText(description);
    const userDueDate = onValidateText(dueDate);

    if (!userTitle || !userDescription || !userDueDate) {
      const newErrors = {
        title: !userTitle,
        description: !userDescription,
        dueDate: !userDueDate,
      };
      setErrors(newErrors);
    } else {
      if (userTitle && userDescription && userDueDate) {
        const data: ProjectFormData = {
          title: userTitle,
          description: userDescription,
          dueDate: userDueDate,
        };

        // send data to app using handle submit
        handleSubmit(data);
        // clear inputs onSumit
        onClear();
      }
    }
  };

  // clear ref when data has valid submit
  // clear data on cancel

  const onClear = () => {
    if (title.current) title.current.value = "";
    if (description.current) description.current.value = "";
    if (dueDate.current) dueDate.current.value = "";
    setErrors(intialErrors);
  };

  const hasErrors = Object.values(errors).some(Boolean);
  return (
    <section>
      <form onSubmit={handleFormValidation}>
        <div>
          <button type="button" onClick={onClear}>
            Cancel
          </button>
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
        <input
          type="string"
          name="dueDate"
          id="dueDate"
          ref={dueDate}
          placeholder="mm/dd/yyyy"
        />
      </form>
      {/* create visual display if error */}
      {hasErrors && (
        <div>
          <p>submited project form has the following errors</p>
          {errors.title && (
            <p> Title must be atleast 4 character not including spaces</p>
          )}
          {errors.description && (
            <p>Description must be atleast 4 character not including spaces</p>
          )}
          {errors.dueDate && <p> Date must be today or later</p>}
        </div>
      )}
    </section>
  );
};

export default ProjectForm;
