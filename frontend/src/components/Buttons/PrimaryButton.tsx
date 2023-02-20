interface PrimaryButtonProps {
  label: string;
  onClick: any;
  type?: 'button' | 'submit';
}

const PrimaryButton = ({
  label,
  onClick,
  type = 'button',
}: PrimaryButtonProps) => {
  return (
    <button
      className="bg-salmon text-white font-bold p-2 md:px-4 rounded-md w-full sm:w-max outline-none"
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
