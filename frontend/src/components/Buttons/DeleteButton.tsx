import { FaTrashAlt } from 'react-icons/fa';

import SpinnerSmall from '../Spinners/SpinnerSmall';

interface DeleteButtonProps {
  loading: boolean;
  onClick: (e: any) => void;
  screenReaderMessage: string;
}

const DeleteButton = ({
  loading,
  onClick,
  screenReaderMessage,
}: DeleteButtonProps) => {
  return (
    <button
      type="button"
      className="w-14 h-14 hover:bg-gray-200 focus:bg-gray-200 text-salmon flex items-center justify-center bg-opacity-80 hover:bg-opacity-100 font-bold text-base rounded-full"
      onClick={onClick}
    >
      {loading ? (
        <SpinnerSmall />
      ) : (
        <>
          <FaTrashAlt fontSize={20} />
          <span className="sr-only">{screenReaderMessage}</span>
        </>
      )}
    </button>
  );
};

export default DeleteButton;
