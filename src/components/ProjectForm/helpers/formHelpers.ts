import { isValidText, isValidDate } from "../../../utils/Validations";
import type { ErrorProps, ProjectFormData } from "../types";

type ValidationResult =
  | { validFormData: ProjectFormData }
  | { errors: ErrorProps };

type Refs = {
  titleRef: React.RefObject<HTMLInputElement>;
  descriptionRef: React.RefObject<HTMLTextAreaElement>;
  dueDateRef: React.RefObject<HTMLInputElement>;
};

// Create a default data object

export const ValidateFormData = (
  formData: ProjectFormData
): ValidationResult => {
  const errors: ErrorProps = {};
  const { title, description, dueDate } = formData;
  const validFormData = {
    title: "",
    description: "",
    dueDate: "",
  };
  if (!isValidText(title ?? "")) {
    errors.title = "Title too short!";
  } else {
    validFormData.title = title!;
  }
  if (!isValidText(description ?? "")) {
    errors.description = "Description  too short!";
  } else {
    validFormData.description = description!;
  }
  if (!isValidDate(dueDate ?? "")) {
    errors.dueDate = "Due date must be today or later";
  } else {
    validFormData.dueDate = dueDate!;
  }
  return Object.keys(errors).length > 0 ? { errors } : { validFormData };
};

export const getFormValues = ({
  titleRef,
  descriptionRef,
  dueDateRef,
}: Refs) => {
  const title: string = titleRef.current?.value ?? "";
  const description: string = descriptionRef.current?.value ?? "";
  const dueDate: string = dueDateRef.current?.value ?? "";

  const formValues = {
    title,
    description,
    dueDate,
  };
  return formValues;
};

export const onClear = ({ titleRef, descriptionRef, dueDateRef }: Refs) => {
  // Clear refs
  if (titleRef.current) titleRef.current.value = "";
  if (descriptionRef.current) descriptionRef.current.value = "";
  if (dueDateRef.current) dueDateRef.current.value = "";
};
