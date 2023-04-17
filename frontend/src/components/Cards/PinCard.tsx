import DownloadLink from '../Links/DownloadLink';
import HearthButton from '../Buttons/HearthButton';
import { Link } from 'react-router-dom';
import { PinProps } from '../../utils/schemaTypes';
import UserProfileLink from '../Links/ProfileLink';
import { addOrRemovePinFromFavorites } from '../../utils/pins';
import { fetchUser } from '../../utils/fetchUser';
import { urlFor } from '../../client';

interface PinCardProps {
  pin: PinProps;
  savingPin: boolean;
  isSaved: boolean;
  setIsSaved: any;
}

const PinCard = ({
  pin: { image, _id, about },
  savingPin,
  isSaved,
  setIsSaved,
}: PinCardProps) => {
  // 🦮 Fetch user data from local storage 🦮
  const user = fetchUser();

  return (
    <figure className="m-2 relative">
      <div className="relative">
        {/* 📸 Image link to pin details 📸 */}
        <Link
          to={`/pin-detail/${_id}`}
          className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden  "
          itemProp="contentUrl"
        >
          <img src={image?.asset?.url} alt="" className="rounded-lg w-full" />
          <span className="sr-only">See the image details of {about}</span>
        </Link>

        {/* ⬇️ Download icon ⬇️ */}
        <DownloadLink image={`${image?.asset?.url}?dl=`} about={about} />

        <HearthButton
          id={_id}
          description={about}
          classes="absolute top-2 right-2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2  hover:shadow-md"
          onClick={addOrRemovePinFromFavorites}
          iconSize={25}
          loading={savingPin}
          isSaved={isSaved || false}
          setIsSaved={setIsSaved}
        />
      </div>

      {/* 🧑 User link 🧑 */}
      <UserProfileLink
        id={user?.sub}
        image={user?.picture}
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

export default PinCard;
