import { forwardRef } from "react";
import clsx from "clsx";
import { InputDivStyles, InputStyles } from "./InputStles";

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  hideLabel?: boolean;
  placeholder?: string;
  rows?: number;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, id, hideLabel, placeholder, rows, ...rest }, ref) => {
    const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1);

    return (
      <div className={InputDivStyles}>
        <label
          htmlFor={id}
          className={clsx(
            "font-medium text-sm text-stone-700",
            hideLabel && "sr-only"
          )}
        >
          {capitalizedLabel}
        </label>
        <textarea
          rows={rows}
          placeholder={placeholder}
          ref={ref}
          id={id}
          {...rest}
          className={InputStyles}
        />
      </div>
    );
  }
);

export default TextArea;
