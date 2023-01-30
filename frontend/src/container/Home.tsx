import { AiFillCloseCircle } from 'react-icons/ai';
import { HiMenu } from 'react-icons/hi';
import { Link, Route, Routes } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import Pins from './Pins';
import logo from '../assets/logo.png';
import { client } from '../client';
import { userQuery } from '../utils/data';
import { fetchUser } from '../utils/fetchUser';
import { UserProps } from './../utils/schemaTypes';
import Sidebar from '../components/Sidebar';
import UserProfile from '../components/UserProfile';

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
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        {user && <Sidebar user={user} />}
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt="user" className="w-28" />
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            {user && <Sidebar user={user} closeToggle={setToggleSidebar} />}
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          {user && <Route path="/*" element={<Pins user={user} />} />}
        </Routes>
      </div>
    </div>
  );
};

export default Home;