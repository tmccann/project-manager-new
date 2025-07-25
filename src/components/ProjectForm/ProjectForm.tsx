import React, { useRef, useState } from "react";
import Modal from "./ErrorModal/Modal";
import { ModalHandle } from "./ErrorModal/Modal";
import { ProjectFormData, ErrorProps } from "./types";
import { ValidateFormData } from "./helpers/dataValidation";

type ProjectFormProps = {
  handleSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
};

const intialErrors = {
  title: "",
  description: "",
  dueDate: "",
};
const ProjectForm = ({ handleSubmit, onCancel }: ProjectFormProps) => {
  const [errors, setErrors] = useState<ErrorProps>(intialErrors);

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);
  const modal = useRef<ModalHandle>(null);

  const handleFormValidation = (e: React.FormEvent) => {
    e.preventDefault();
    const title: string = titleRef.current?.value ?? "";
    const description: string = descriptionRef.current?.value ?? "";
    const dueDate: string = dueDateRef.current?.value ?? "";
    const results = ValidateFormData({ title, description, dueDate });
    if ("errors" in results) {
      setErrors({
        title: results.errors.title,
        description: results.errors.description,
        dueDate: results.errors.dueDate,
      });
      modal.current?.open();
    } else {
      const data = results.data;
      handleSubmit(data);
      onClear();
    }
  };

  const onClear = () => {
    // clear refs
    if (titleRef.current) titleRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
    if (dueDateRef.current) dueDateRef.current.value = "";
    // clear errors
    setErrors(intialErrors);
    onCancel();
  };

  const hasErrors = errors.title || errors.description || errors.dueDate;
  return (
    <section className="mt-16">
      <Modal ref={modal}>
        {hasErrors && (
          <div>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-red-700 flex items-center gap-2">
                Form Error
              </h2>
              <p className="text-sm text-stone-500 mt-1">
                Please correct the following before submitting:
              </p>
            </div>

            <ul className="list-disc list-inside space-y-2 text-red-600">
              {errors.title && <li>{errors.title}</li>}
              {errors.description && <li>{errors.description}</li>}
              {errors.dueDate && <li>{errors.dueDate}</li>}
            </ul>
          </div>
        )}
      </Modal>
      <form
        className="flex flex-col max-w-8/12 text-left"
        onSubmit={handleFormValidation}
      >
        <div className="flex justify-end gap-2">
          <button
            className="py-2 px-4 rounded-md mb-6 font-semibold"
            type="button"
            onClick={onClear}
          >
            Cancel
          </button>
          <button
            className="bg-stone-900 hover:bg-stone-600 text-stone-200 transition-colors py-2 px-4 rounded-md mb-6"
            type="submit"
          >
            Save
          </button>
        </div>

        <label className="block" htmlFor="title">
          Title
        </label>
        <input
          className="px-2 py-1 rounded-sm bg-stone-200 border-b-2 border-stone-300 focus:outline-none focus:border-stone-400"
          type="text"
          name="title"
          id="title"
          ref={titleRef}
        />

        <label className="block" htmlFor="description">
          Description
        </label>
        <input
          className="px-2 py-1 rounded-sm bg-stone-200 border-b-2 border-stone-300 focus:outline-none focus:border-stone-400"
          type="text"
          name="description"
          id="description"
          ref={descriptionRef}
        />

        <label className="block" htmlFor="dueDate">
          Due Date
        </label>
        <input
          className="px-2 py-1 rounded-sm bg-stone-200 border-b-2 border-stone-300 focus:outline-none focus:border-stone-400"
          type="text"
          name="dueDate"
          id="dueDate"
          ref={dueDateRef}
        />
      </form>
    </section>
  );
};

export default ProjectForm;
