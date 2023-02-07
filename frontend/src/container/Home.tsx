import { AiFillCloseCircle } from 'react-icons/ai';
import { Route, Routes } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import Pins from './Pins';
import Sidebar from '../components/Sidebar';
import { UserProps } from './../utils/schemaTypes';
import { client } from '../client';
import { fetchUser } from '../utils/fetchUser';
import { userQuery } from '../utils/data';

const Home = () => {
  // 🎣 Hooks 🎣
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 🏛️ Get user from local storage 🏛️
  const userInfo = fetchUser();

  // 🦮 Fetch user data from sanity client 🦮
  useEffect(() => {
    const query = userQuery(userInfo?.sub);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 📜 Scroll to top on first load 📜
  useEffect(() => {
    scrollRef?.current?.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex bg-gray-200 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      {/* Sidebar */}
      <div className="hidden md:flex h-screen flex-initial">
        {user && <Sidebar />}
      </div>

      {/* Mobile Sidebar */}
      <div className="flex md:hidden flex-row">
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            {user && <Sidebar closeToggle={setToggleSidebar} />}
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          {user && (
            <Route
              path="/*"
              element={<Pins user={user} setToggleSidebar={setToggleSidebar} />}
            />
          )}
        </Routes>
      </div>
    </div>
  );
};

export default Home;
