import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

import CreatePin from '../components/CreatePin';
import Feed from '../components/Feed';
import Navbar from '../components/Navbar';
import PinDetail from '../components/PinDetail';
import Search from '../components/Search';
import UserProfile from '../components/UserProfile';
import { PinProps, UserProps } from './../utils/schemaTypes';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';

interface PinsProps {
  setToggleSidebar: (toggleSidebar: boolean) => void;
  user: UserProps;
}

const Pins = ({ setToggleSidebar, user }: PinsProps) => {
  // 🏡 Local state 🏡
  const [loading, setLoading] = useState<boolean>(false);
  const [pins, setPins] = useState<PinProps[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // 🎣 Hooks 🎣
  const navigate = useNavigate();
  const location = useLocation();

  // 🔎 Search handler 🔎
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
    <div>
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
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetail user={user} />}
          />
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/create-pin" element={<CreatePin user={user} />} />
          <Route
            path="/search"
            element={
              <Search searchTerm={searchTerm} loading={loading} pins={pins} />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
