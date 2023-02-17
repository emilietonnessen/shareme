import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import MasonryLayout from '../containers/MasonryLayout';
import Spinner from '../components/Spinners/Spinner';
import { PinProps, UserProps } from '../utils/schemaTypes';
import { client } from '../client';
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from '../utils/data';
import InfoBox from '../components/NoticeBoxes/InfoBox';

const randomImage = 'https://source.unsplash.com/1600x900/?nature';

const activeBtnStyles =
  'bg-salmon text-white font-bold p-2 rounded-md w-20 outline-none';
const notActiveBtnStyles =
  'bg-primary mr-4 text-black font-bold p-2 rounded-md w-20 outline-none';

const ProfilePage = () => {
  // 🏡 Local state 🏡
  const [user, setUser] = useState<UserProps | null>(null);
  const [pins, setPins] = useState<PinProps[]>([]);
  const [text, setText] = useState<any>('Created');
  const [activeBtn, setActiveBtn] = useState<string>('created');

  // 🎣 Hooks 🎣
  const { userId } = useParams();

  // Fetch user data
  useEffect(() => {
    if (userId) {
      const query = userQuery(userId);

      client.fetch(query).then((data) => {
        setUser(data[0]);
      });
    }
  }, [userId]);

  // Fetch pins data
  useEffect(() => {
    if (userId) {
      if (text === 'Created') {
        const createdPinsQuery = userCreatedPinsQuery(userId);

        client.fetch(createdPinsQuery).then((data) => {
          setPins(data);
        });
      } else {
        const savedPinsQuery = userSavedPinsQuery(userId);

        client.fetch(savedPinsQuery).then((data) => {
          setPins(data);
        });
      }
    }
  }, [text, userId]);

  if (!user) {
    return <Spinner message="Loading profile..." />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center max-w-6xl mx-auto">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7 gap-4 bg-white rounded-md">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImage}
              alt="banner"
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover rounded-t-md"
            />
            <img
              src={user?.image}
              alt="user"
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user?.userName}
            </h1>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e?.currentTarget?.textContent);
                setActiveBtn('created');
              }}
              className={`${
                activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e?.currentTarget?.textContent);
                setActiveBtn('saved');
              }}
              className={`${
                activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>
          <div className="mb-10">
            {pins?.length ? (
              <div className="sm:px-2">
                <MasonryLayout pins={pins} />
              </div>
            ) : (
              <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
                <InfoBox message="No images found. Try saving some!" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
