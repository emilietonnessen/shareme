import { Oval } from 'react-loader-spinner';

const SpinnerSmall = ({ message }: { message?: string }) => {
  return (
    <div className="">
      <Oval
        color="#0089FF"
        secondaryColor="#757575"
        height={20}
        width={20}
        wrapperClass="rounded-full !p-0"
        ariaLabel="oval-loading"
        strokeWidth={4}
      />

      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
};

export default SpinnerSmall;
