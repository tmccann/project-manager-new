import React, { useRef, useState } from "react";
import Modal from "./ErrorModal/Modal";
import { ModalHandle } from "./ErrorModal/Modal";
import { ProjectFormData, ErrorProps } from "./types";
import { ValidateFormData } from "./helpers/dataValidation";
import Button from "../ui/Buttons";
import Input from "../ui/Input";
import TextArea from "../ui/Textarea";

type ProjectFormProps = {
  handleSubmit: (AddProjectData: ProjectFormData) => void;
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
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
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
      const AddProjectData = results.data;
      handleSubmit(AddProjectData);
      onClear();
    }
  };

  const onClear = () => {
    // Clear refs
    if (titleRef.current) titleRef.current.value = "";
    if (descriptionRef.current) descriptionRef.current.value = "";
    if (dueDateRef.current) dueDateRef.current.value = "";
    // Clear errors
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
          <Button variant="ghostDanger" onClick={onClear}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </div>
        <Input ref={titleRef} label="title" id="title" />
        <TextArea
          ref={descriptionRef}
          label="description"
          id="description"
          rows={4}
        />
        <Input
          ref={dueDateRef}
          label="due date"
          id="duedata"
          placeholder="mm/dd/yyyy"
        />
      </form>
    </section>
  );
};

export default ProjectForm;
