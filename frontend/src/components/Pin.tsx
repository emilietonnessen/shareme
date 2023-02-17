import { Link } from 'react-router-dom';

import DownloadLink from './DownloadLink';
import HeartIcon from './HeartIcon';
import { PinProps } from '../utils/schemaTypes';
import { fetchUser } from '../utils/fetchUser';
import { urlFor } from '../client';
import UserProfileLink from './UserProfileLink';

const Pin = ({ pin: { image, _id, about, saved } }: { pin: PinProps }) => {
  // 🦮 Fetch user data from local storage 🦮
  const user = fetchUser();

  return (
    <figure className="m-2 relative">
      <div className="relative">
        {/* 📸 Image link to pin details 📸 */}
        <Link
          to={`/pin-detail/${_id}`}
          className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out "
          itemProp="contentUrl"
        >
          <img
            src={urlFor(image).width(800).url()}
            alt=""
            className="rounded-lg w-full"
          />
          <span className="sr-only">See the image details of {about}</span>
        </Link>

        {/* ⬇️ Download icon ⬇️ */}
        <DownloadLink image={`${image?.asset?.url}?dl=`} about={about} />

        <HeartIcon id={_id} saved={saved} about={about} />
      </div>

      {/* 🧑 User link 🧑 */}
      <UserProfileLink
        id={user?.sub}
        image={user.picture}
        classesLink="flex p-2 gap-2 items-center text-white mt-1 w-full"
        classesImage="w-8 h-8 rounded-full object-cover"
        classesText="text-black text-sm font-semibold"
        userName={
          <>
            <span className="sr-only">Go to</span>
            <span> {user?.given_name}</span>
            <span className="sr-only">s profile page</span>
          </>
        }
      />
    </figure>
  );
};

export default Pin;
