interface LabelProps {
  htmlFor: string;
  isRequired?: boolean;
  title: string;
}

const Label: React.FC<LabelProps> = ({
  htmlFor,
  title,
  isRequired = false,
  ...props
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium text-gray-900 dark:text-white"
    >
      {title} {isRequired ? <span className="text-red-500">*</span> : <></>}
    </label>
  );
};

export default Label;
