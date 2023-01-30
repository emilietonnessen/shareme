import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import CreatePin from '../components/CreatePin';
import Feed from '../components/Feed';
import Navbar from '../components/Navbar';
import PinDetail from '../components/PinDetail';
import Search from '../components/Search';
import { UserProps } from './../utils/schemaTypes';

const Pins = ({ user }: { user: UserProps }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <div className="px-2 md:px-5">
      <div className="bg-grey-50">
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          user={user}
        />
      </div>
      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route
            path="/pin-detail/:pinId"
            element={<PinDetail user={user} />}
          />
          <Route path="/create-pin" element={<CreatePin user={user} />} />
          <Route path="/search" element={<Search searchTerm={searchTerm} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Pins;