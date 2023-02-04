import { HiMenu } from 'react-icons/hi';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'usehooks-ts';

import logo from '../assets/logo.png';
import { UserProps } from './../utils/schemaTypes';

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: any;
  user: UserProps;
  setToggleSidebar: (toggleSidebar: boolean) => void;
}

const Navbar = ({
  searchTerm,
  setSearchTerm,
  user,
  setToggleSidebar,
}: NavbarProps) => {
  // 🎣 Hooks 🎣
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)'); // 768px equals "md" in tailwind

  // If the user is not logged in
  // if (!user) return null;

  return (
    <header className="flex flex-col ">
      {/* Mobile top bar */}
      {isMobile && (
        <div className="flex flex-row">
          <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
            <HiMenu
              fontSize={40}
              className="cursor-pointer"
              onClick={() => setToggleSidebar(true)}
            />
            <Link to="/">
              <img src={logo} alt="shareme logo" className="w-28" />
            </Link>
            <Link to={`user-profile/${user?._id}`}>
              <img src={user?.image} alt="user" className="w-28" />
            </Link>
          </div>
        </div>
      )}

      {/* Search bar */}
      <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 p-2 md:p-5">
        {/* Search input */}
        <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
          <button>
            <IoMdSearch fontSize={21} className="ml-1" />
            <span className="sr-only">Search pins</span>
          </button>
          <label htmlFor="search" className="text-sm -mt-14 absolute">
            Search pins
          </label>
          <input
            type="text"
            name="search"
            id="search"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter search term"
            value={searchTerm}
            onFocus={() => navigate('/search')}
            className="p-2 w-full bg-white outline-none"
          />
        </div>

        {/* User + Create Pin */}
        <nav className="flex gap-3">
          <Link to={`user-profile/${user?._id}`} className="hidden md:block">
            <img src={user.image} alt="user" className="w-14 h-12 rounded-lg" />
          </Link>
          <Link
            to="/create-pin"
            className="bg-black text-white rounded-lg w-12 md:w-14 md:h-12 flex justify-center items-center"
          >
            <span className="sr-only">Add pin</span>
            <IoMdAdd />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
