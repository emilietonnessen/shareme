import { Link } from 'react-router-dom';
import { MdDownloadForOffline } from 'react-icons/md';
import { TiHeart, TiHeartOutline } from 'react-icons/ti';
import { useState } from 'react';

import SpinnerSmall from './SpinnerSmall';
import { PinProps } from '../utils/schemaTypes';
import { client, urlFor } from '../client';
import { fetchUser } from '../utils/fetchUser';

const Pin = ({ pin: { image, _id, about, saved } }: { pin: PinProps }) => {
  // 🏡 Local state 🏡
  const [savingPin, setSavingPin] = useState(false);
  const [isSaved, setIsSaved] = useState(saved);

  // 🦮 Fetch user data from local storage 🦮
  const user = fetchUser();

  // ♟️ Variables ♟️
  const buttonStyles =
    'absolute top-2 right-2 bg-white opacity-70 hover:opacity-100 p-2 rounded-3xl hover:shadow-md cursor-pointer';

  // Save pin
  const addOrRemovePinFromFavorites = (id: string, addPin: boolean) => {
    setSavingPin(true);

    client
      .patch(id, {
        set: {
          saved: addPin,
        },
      })
      .commit()
      .then((data) => {
        setIsSaved(data?.saved);
        setSavingPin(false);
      })
      .catch(() => {
        setIsSaved(false);
      });
  };

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
            className="rounded-lg w-full bg-red-500"
          />
          <span className="sr-only">See the pin details of {about}</span>
        </Link>

        {/* ⬇️ Download icon ⬇️ */}
        <a
          href={`${image?.asset?.url}?dl=`}
          download
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 left-2 bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-80 hover:opacity-100 hover:shadow-md"
        >
          <MdDownloadForOffline fontSize={20} />
          <span className="sr-only">Download image of {about}</span>
        </a>

        {/* ❤️ Heart icon ❤️ */}
        {isSaved ? (
          <button
            className={buttonStyles}
            onClick={(e) => {
              e.stopPropagation();
              setIsSaved(false);
              addOrRemovePinFromFavorites(_id, false);
            }}
          >
            {savingPin ? (
              <>
                <SpinnerSmall />

                <span className="sr-only">Removing pins from favorites</span>
              </>
            ) : (
              <>
                <TiHeart fontSize={20} color="red" />
                <span className="sr-only">Remove pin from favorites</span>
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            className={buttonStyles}
            onClick={(e) => {
              e.stopPropagation();
              addOrRemovePinFromFavorites(_id, true);
              setIsSaved(true);
            }}
          >
            {savingPin ? (
              <>
                <SpinnerSmall />
                <span className="sr-only">Adding pin to favorites</span>
              </>
            ) : (
              <>
                <TiHeartOutline fontSize={20} />
                <span className="sr-only">Add pin to favorites</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* 🧑 User link 🧑 */}
      <Link
        to={`user-profile/${user?.sub}`}
        className="flex p-2 gap-2 items-center text-white mt-1 w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={user.picture}
          alt=""
          className="w-8 h-8 rounded-full object-cover"
        />
        <p className="text-black text-sm font-semibold">
          <span className="sr-only">Go to</span>
          <span> {user?.given_name}</span>
          <span className="sr-only">s profile page</span>
        </p>
      </Link>
    </figure>
  );
};

export default Pin;
