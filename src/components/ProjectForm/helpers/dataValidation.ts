import { isValidText, isValidDate } from "../../../utils/Validations";
import type { ErrorProps, ProjectFormData } from "../types";

type ValidationResult = { data: ProjectFormData } | { errors: ErrorProps };

// Create a default data object

export const ValidateFormData = ({
  title,
  description,
  dueDate,
}: ErrorProps): ValidationResult => {
  const errors: ErrorProps = {};
  const data = {
    title: "",
    description: "",
    dueDate: "",
  };
  if (!isValidText(title ?? "")) {
    errors.title = "Title too short!";
  } else {
    data.title = title!;
  }
  if (!isValidText(description ?? "")) {
    errors.description = "Description  too short!";
  } else {
    data.description = description!;
  }
  if (!isValidDate(dueDate ?? "")) {
    errors.dueDate = "Due date must be today or later";
  } else {
    data.dueDate = dueDate!;
  }
  return Object.keys(errors).length > 0 ? { errors } : { data };
};
