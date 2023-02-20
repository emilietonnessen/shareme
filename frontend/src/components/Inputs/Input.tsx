import { inputStyles, labelStyles } from './styles';

interface InputProps {
  label: string;
  name: string;
  onChange: (event: any) => void;
  placeholder: string;
  value: string;
}

const Input = ({ label, name, onChange, placeholder, value }: InputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className={labelStyles}>
        {label}
      </label>
      <input
        type="text"
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

export default Input;
