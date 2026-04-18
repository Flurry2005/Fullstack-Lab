interface InputFieldProps {
  value?: string | number;
  id?: string;
  type?: string;
  name?: string;
  required?: boolean;
  onChange?: (e: any) => void;
  onKeyDown?: string;
  onKeyDownFunc?: () => void;
  additionalClasses?: string;
  placeholder: string;
}

function InputField({
  value,
  id,
  type,
  name,
  required,
  onChange,
  onKeyDown,
  onKeyDownFunc,
  additionalClasses,
  placeholder,
}: InputFieldProps) {
  return (
    <input
      id={id}
      value={value}
      type={type}
      name={name}
      onChange={onChange}
      onKeyDown={async (e) => {
        if (e.key === onKeyDown && onKeyDownFunc) {
          onKeyDownFunc();
        }
      }}
      required={required}
      placeholder={placeholder}
      className={
        "px-3 border border-(--accent-color) rounded-xl outline-none " +
        additionalClasses
      }
    />
  );
}

export default InputField;
