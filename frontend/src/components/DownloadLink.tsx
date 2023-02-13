import React from 'react';
import { MdDownloadForOffline } from 'react-icons/md';

interface DownloadLinkProps {
  image: any;
  about: string;
  isPinDetailPage?: boolean;
}

const DownloadLink = ({ image, about, isPinDetailPage }: DownloadLinkProps) => {
  const pinDetailsClasses =
    'w-14 h-14 flex justify-center items-center hover:bg-gray-200 text-salmon';
  const pinCardClasses =
    'absolute top-2 left-2 w-9 h-9 bg-white hover:shadow-md';

  return (
    <>
      {/* ⬇️ Download icon ⬇️ */}
      <a
        href={image}
        download
        onClick={(e) => e.stopPropagation()}
        className={`${
          isPinDetailPage ? pinDetailsClasses : pinCardClasses
        }    rounded-full flex items-center justify-center text-dark text-xl bg-opacity-80 hover:bg-opacity-100 `}
      >
        <MdDownloadForOffline fontSize={isPinDetailPage ? 25 : 20} />
        <span className="sr-only">Download image of {about}</span>
      </a>
    </>
  );
};

export default DownloadLink;
