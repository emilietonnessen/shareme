import { VscError } from 'react-icons/vsc';

const ErrorBox = ({ message }: { message: string }) => (
  <div
    aria-live="assertive"
    className="bg-red-200 p-3 ml-2 border-red-300 text-red-700 max-w-lg rounded-md flex gap-2 items-center"
  >
    <VscError fontSize={20} />
    <p className="font-bold text-sm">{message}</p>
  </div>
);

export default ErrorBox;
