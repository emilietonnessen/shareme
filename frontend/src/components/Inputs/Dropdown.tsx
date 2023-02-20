import { inputStyles, labelStyles } from './styles';

interface DropdownProps {
  onChange: any;
  options: any[];
}

const Dropdown = ({ onChange, options }: DropdownProps) => {
  const optionStyles = 'text-base border-0 outline-none capitalize text-black';

  return (
    <div className="flex flex-col">
      <label htmlFor="category" className={labelStyles}>
        Category
      </label>
      <select
        name="category"
        id="category"
        onChange={onChange}
        className={inputStyles}
      >
        <option value="other" className={optionStyles}>
          Select category
        </option>
        {options.map((category) => (
          <option
            key={category.name}
            value={category.name}
            className={optionStyles}
          >
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
