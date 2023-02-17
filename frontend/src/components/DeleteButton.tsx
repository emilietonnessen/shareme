import { FaTrashAlt } from 'react-icons/fa';
import SpinnerSmall from './SpinnerSmall';

interface DeleteButtonProps {
  onClick: (e: any) => void;
  screenReaderMessage: string;
  loading: boolean;
}

const DeleteButton = ({
  onClick,
  screenReaderMessage,
  loading,
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
