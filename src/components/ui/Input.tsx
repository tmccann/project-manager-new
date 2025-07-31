import { forwardRef } from "react";
import clsx from "clsx";
import { InputDivStyles, InputStyles } from "./InputStles";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hideLabel?: boolean;
  placeholder?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, hideLabel, placeholder, ...rest }, ref) => {
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
        <input
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

export default Input;
