import { useState } from 'react';
import { TiHeart, TiHeartOutline } from 'react-icons/ti';
import { client } from '../client';
import SpinnerSmall from './SpinnerSmall';

interface HeartIconProps {
  id: string;
  saved: boolean;
  isPinDetailPage?: boolean;
}

const HeartIcon = ({ id, saved, isPinDetailPage }: HeartIconProps) => {
  // 🏡 Local state 🏡
  const [savingPin, setSavingPin] = useState(false);
  const [isSaved, setIsSaved] = useState(saved);

  // ♟️ Variables ♟️
  const pinCardButtonStyles =
    'absolute top-2 right-2 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-3xl hover:shadow-md cursor-pointer';
  const pinDetailsButtonStyles =
    'text-salmon hover:bg-gray-200 w-14 h-14 flex justify-center items-center rounded-full cursor-pointer';

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
    <>
      {/* ❤️ Heart icon ❤️ */}
      {isSaved ? (
        <button
          className={
            isPinDetailPage ? pinDetailsButtonStyles : pinCardButtonStyles
          }
          onClick={(e) => {
            e.stopPropagation();
            setIsSaved(false);
            addOrRemovePinFromFavorites(id, false);
          }}
        >
          {savingPin ? (
            <>
              <SpinnerSmall />

              <span className="sr-only">Removing pins from favorites</span>
            </>
          ) : (
            <>
              <TiHeart
                fontSize={isPinDetailPage ? 25 : 20}
                className="text-salmon"
              />
              <span className="sr-only">Remove pin from favorites</span>
            </>
          )}
        </button>
      ) : (
        <button
          type="button"
          className={
            isPinDetailPage ? pinDetailsButtonStyles : pinCardButtonStyles
          }
          onClick={(e) => {
            e.stopPropagation();
            addOrRemovePinFromFavorites(id, true);
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
              <TiHeartOutline
                fontSize={isPinDetailPage ? 25 : 20}
                className="m-0"
              />
              <span className="sr-only">Add pin to favorites</span>
            </>
          )}
        </button>
      )}
    </>
  );
};

export default HeartIcon;
