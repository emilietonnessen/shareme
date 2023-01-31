import { AiOutlineInfoCircle } from 'react-icons/ai';

const InfoBox = ({ message }: { message: string }) => (
  <div className="bg-blue-200 p-3 ml-2 border-blue-300 text-blue-900 rounded-md max-w-lg flex gap-2 items-center">
    <AiOutlineInfoCircle fontSize={20} />
    <p className=" font-bold text-sm">{message}</p>
  </div>
);

export default InfoBox;
