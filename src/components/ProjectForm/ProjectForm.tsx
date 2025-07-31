import React, { useRef, useState } from "react";
import Modal from "./ErrorModal/Modal";
import { ModalHandle } from "./ErrorModal/Modal";
import { ProjectFormData, ErrorProps } from "./types";
import {
  getFormValues,
  ValidateFormData,
  onClear,
} from "./helpers/formHelpers";
import Button from "../ui/Buttons";
import Input from "../ui/Input";
import TextArea from "../ui/Textarea";
import FormErrorsContent from "./ErrorModal/FormErrorsContent";

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

  const refs = { titleRef, descriptionRef, dueDateRef };
  const handleFormValidation = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = getFormValues(refs);
    const results = ValidateFormData(formData);
    if ("errors" in results) {
      setErrors({
        title: results.errors.title,
        description: results.errors.description,
        dueDate: results.errors.dueDate,
      });
      modal.current?.open();
    } else {
      const addProjectData = results.validFormData;
      handleSubmit(addProjectData);
      onClear(refs);
      setErrors(intialErrors);
      onCancel();
    }
  };

  const { title, description, dueDate } = errors;
  const hasErrors = title || description || dueDate;

  return (
    <section className="mt-16">
      <Modal ref={modal}>
        {hasErrors && <FormErrorsContent errors={errors} />}
      </Modal>
      <form
        className="flex flex-col max-w-8/12 text-left"
        onSubmit={handleFormValidation}
      >
        <div className="flex justify-end gap-2">
          <Button variant="ghostDanger" onClick={onCancel}>
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
