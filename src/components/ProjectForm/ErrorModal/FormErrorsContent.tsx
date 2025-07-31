import { ErrorProps } from "../types";
type FormErrorContentProps = {
  errors: ErrorProps;
};

const FormErrorsContent = ({ errors }: FormErrorContentProps) => {
  const { title, description, dueDate } = errors;
  return (
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
        {title && <li>{title}</li>}
        {description && <li>{description}</li>}
        {dueDate && <li>{dueDate}</li>}
      </ul>
    </div>
  );
};

export default FormErrorsContent;
