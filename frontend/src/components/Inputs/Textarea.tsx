import { inputStyles, labelStyles } from './styles';

interface TextareaProps {
  label: string;
  name: string;
  onChange: (event: any) => void;
  placeholder: string;
  value: string;
}

const Textarea = ({
  label,
  name,
  onChange,
  placeholder,
  value,
}: TextareaProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className={labelStyles}>
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputStyles}
      />
    </div>
  );
};

export default Textarea;
