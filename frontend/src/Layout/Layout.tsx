import { AiFillCloseCircle } from 'react-icons/ai';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import UploadPinPage from '../pages/UploadPinPage';
import FeedPage from '../pages/FeedPage';
import Navbar from '../containers/Navbar';
import PinDetailsPage from '../pages/PinDetailsPage';
import SearchPage from '../pages/SearchPage';
import Sidebar from '../containers/Sidebar';
import ProfilePage from '../pages/ProfilePage';
import { PinProps, UserProps } from '../utils/schemaTypes';
import { client } from '../client';
import { feedQuery, searchQuery, userQuery } from '../utils/data';
import { fetchUser } from '../utils/fetchUser';

const Layout = () => {
  // 🏡 Local state 🏡
  const [loading, setLoading] = useState<boolean>(false);
  const [pins, setPins] = useState<PinProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // 🎣 Hooks 🎣
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const [user, setUser] = useState<UserProps | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  // 🔎 SearchPage handler 🔎
  const searchHandler = () => {
    if (searchTerm) {
      navigate('/search');
      setLoading(true);

      const query = searchQuery(searchTerm.toLowerCase());

      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  };

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
        {user && (
          <>
            <div className="bg-grey-50 md:px-5">
              <Navbar
                pathname={location.pathname}
                searchHandler={searchHandler}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setToggleSidebar={setToggleSidebar}
                user={user}
              />
            </div>
            <div className="h-full px-2 md:px-5">
              <Routes>
                <Route path="/" element={<FeedPage />} />
                <Route path="/category/:categoryId" element={<FeedPage />} />
                <Route
                  path="/pin-detail/:pinId"
                  element={<PinDetailsPage user={user} />}
                />
                <Route path="/user-profile/:userId" element={<ProfilePage />} />
                <Route
                  path="/create-pin"
                  element={<UploadPinPage user={user} />}
                />
                <Route
                  path="/search"
                  element={
                    <SearchPage
                      searchTerm={searchTerm}
                      loading={loading}
                      pins={pins}
                    />
                  }
                />
              </Routes>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Layout;
