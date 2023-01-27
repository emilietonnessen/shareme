import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { client } from '../client';
import { PinProps, UserProps } from './../utils/schemaTypes';
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from '../utils/data';

const randomImage =
  'https://source.unsplash.com/1600x900/?nature,photography,technology';

const activeBtnStyles =
  'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none';
const notActiveBtnStyles =
  'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none';

const UserProfile = () => {
  // 🏡 Local state 🏡
  const [user, setUser] = useState<UserProps | null>(null);
  const [pins, setPins] = useState<PinProps[]>([]);
  const [text, setText] = useState<any>('Created');
  const [activeBtn, setActiveBtn] = useState<string>('created');

  // 🎣 Hooks 🎣
  const navigate = useNavigate();
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

  /* Redirect user if they logout or lose session to google? */
  // Google doesn't have a way to logout. You must do that on the frontend side. We are currently storing the google session in local storage. So we should clear that when logging out
  // Not sure what to do with this function below this comment yet lol. Don't think we need it. Just keeping it here in case, but should be removed if not necessary
  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!user) {
    return <Spinner message="Loading profile..." />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImage}
              alt="banner"
              className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
            />
            <img
              src={user?.image}
              alt="user"
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user?.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user?._id && (
                <button
                  type="button"
                  onClick={logout}
                  className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                >
                  <AiOutlineLogout color="red" fontSize={21} />
                </button>
              )}
            </div>
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
          {pins?.length ? (
            <div className="px-2">
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
              No Pins found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
