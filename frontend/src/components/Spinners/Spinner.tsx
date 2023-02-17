import { Oval } from 'react-loader-spinner';

const Spinner = ({ message }: { message?: string }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Oval
        color="#00BFFF"
        secondaryColor="#B5B5B5"
        height={50}
        width={200}
        wrapperClass="m-5"
        ariaLabel="oval-loading"
        strokeWidth={4}
      />

      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
};

export default Spinner;
