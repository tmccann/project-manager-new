import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "ghost" | "secondary" | "danger" | "ghostDanger";
  disabled?: boolean;
  className?: string;
  "data-testid"?: string;
  autoMargin?: boolean;
};

const baseStyles =
  "rounded-md font-semibold text-sm px-4 py-1.5 transition-colors";

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-stone-900 text-stone-200 hover:bg-stone-700",
  ghost:
    "text-stone-800 border border-transparent hover:border-stone-500 hover:text-stone-500",
  secondary:
    "bg-stone-700 hover:bg-stone-600 text-stone-400 hover:text-stone-200 transition-colors",
  danger: "text-red-700 hover:text-red-900 border border-red-700",
  ghostDanger:
    "text-stone-800 border border-transparent hover:border-red-700 hover:text-red-700",
};

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className,
  "data-testid": testId,
  autoMargin = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        disabled && "opacity-50 cursor-not-allowed",
        autoMargin && "m-auto",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
