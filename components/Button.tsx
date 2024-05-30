import clsx from "clsx";
import ClipLoader from "react-spinners/ClipLoader";
import React from "react";
type Variant = "solid" | "outline";
type ColorSchema = "blue" | "red" | "green";

interface ButtonProps {
  title: string;
  isDisabled?: boolean;
  variant?: Variant;
  colorSchema: ColorSchema;
  width?: string;
  height?: string;
  isLoading?: boolean;
}

const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  title,
  isDisabled = false,
  variant = "solid",
  colorSchema,
  width = "full",
  height = "md",
  isLoading = false,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={isDisabled}
      className={clsx(
        `w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`,
        {
          "bg-blue-500 text-white":
            colorSchema === "blue" && variant === "solid",
          "border-blue-500 text-blue-500":
            colorSchema === "blue" && variant === "outline",
          "bg-red-500 text-white": colorSchema === "red" && variant === "solid",
          "border-red-500 text-red-500 ":
            colorSchema === "red" && variant === "outline",
          "bg-green-500 text-white":
            colorSchema === "green" && variant === "solid",
          "border-green-500 text-green-500":
            colorSchema === "green" && variant === "outline",
          "opacity-25": isDisabled,
          "w-24": width === "md",
          "w-full": width === "full",
          "h-8": width === "sm",
          "h-12": width === "md",
        }
      )}
    >
      {!isLoading ? (
        title
      ) : (
        <ClipLoader
          color={"#36d7b7"}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
    </button>
  );
};

export default Button;
