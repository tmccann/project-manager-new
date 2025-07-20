import React, { useRef, useState } from "react";
import Modal from "./ErrorModal/Modal";
import { ModalHandle } from "./ErrorModal/Modal";

type ProjectFormProps = {
  handleSubmit: (data: ProjectFormData) => void;
};

export type ProjectFormData = {
  title: string;
  description: string;
  dueDate: string;
};

export type ErrorProps = {
  title?: string;
  description?: string;
  dueDate?: string;
};

const ProjectForm = ({ handleSubmit }: ProjectFormProps) => {
  const [errors, setErrors] = useState<ErrorProps>({
    title: "",
    description: "",
    dueDate: "",
  });

  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);
  const dueDate = useRef<HTMLInputElement>(null);
  const modal = useRef<ModalHandle>(null);

  const onValidText = (ref: React.RefObject<HTMLInputElement>) => {
    const textElement = ref.current;
    if (!textElement) return null;
    const val = textElement.value;
    return val.length >= 4 ? val : null;
  };

  const isValidDate = (ref: React.RefObject<HTMLInputElement>) => {
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
    const userDueDate = isValidDate(dueDate);

    const newErrors: ErrorProps = {};
    if (!userTitle || userTitle.trim().length < 4) {
      newErrors.title = "Title to short!";
    }
    if (!userDescription || userDescription.trim().length < 4) {
      newErrors.description = "Description to short!";
    }
    if (!userDueDate) {
      newErrors.dueDate = "Due date must be today or later";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      modal.current?.open();
      return;
    } else {
      if (userTitle && userDescription && userDueDate) {
        const data: ProjectFormData = {
          title: userTitle,
          description: userDescription,
          dueDate: userDueDate,
        };
        handleSubmit(data);
        onClear();
      }
    }
  };

  const onClear = () => {
    if (title.current) title.current.value = "";
    if (description.current) description.current.value = "";
    if (dueDate.current) dueDate.current.value = "";
    setErrors({
      title: "",
      description: "",
      dueDate: "",
    });
  };
  const hasErrors = errors.title || errors.description || errors.dueDate;
  return (
    <section>
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
      <form className="flex flex-col w-full" onSubmit={handleFormValidation}>
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
          ref={title}
        />

        <label className="block" htmlFor="description">
          Description
        </label>
        <input
          className="px-2 py-1 rounded-sm bg-stone-200 border-b-2 border-stone-300 focus:outline-none focus:border-stone-400"
          type="text"
          name="description"
          id="description"
          ref={description}
        />

        <label className="block" htmlFor="dueDate">
          Due Date
        </label>
        <input
          className="px-2 py-1 rounded-sm bg-stone-200 border-b-2 border-stone-300 focus:outline-none focus:border-stone-400"
          type="text"
          name="dueDate"
          id="dueDate"
          ref={dueDate}
        />
      </form>
    </section>
  );
};

export default ProjectForm;
