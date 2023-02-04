import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import CreatePin from '../components/CreatePin';
import Feed from '../components/Feed';
import Navbar from '../components/Navbar';
import PinDetail from '../components/PinDetail';
import Search from '../components/Search';
import UserProfile from '../components/UserProfile';
import { UserProps } from './../utils/schemaTypes';

interface PinsProps {
  user: UserProps;
  setToggleSidebar: (toggleSidebar: boolean) => void;
}

const Pins = ({ user, setToggleSidebar }: PinsProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <div>
      <div className="bg-grey-50">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user}
          setToggleSidebar={setToggleSidebar}
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
          <Route path="/search" element={<Search searchTerm={searchTerm} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;
