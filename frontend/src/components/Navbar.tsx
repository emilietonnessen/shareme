import { HiMenu } from 'react-icons/hi';
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';

import SearchBar from './SearchInput';
import { UserProps } from './../utils/schemaTypes';

interface NavbarProps {
  searchHandler: () => void;
  searchTerm: string;
  setSearchTerm: any;
  setToggleSidebar: (toggleSidebar: boolean) => void;
  user: UserProps;
}

const Navbar = ({
  searchHandler,
  searchTerm,
  setSearchTerm,
  setToggleSidebar,
  user,
}: NavbarProps) => {
  return (
    <header className="flex flex-col ">
      {/* Search bar */}
      <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 p-2 md:p-5 md:flex-row  items-end flex-col-reverse">
        {/* Search input */}
        <div className="w-full">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchHandler={searchHandler}
          />
        </div>

        {/* Hamburger menu + User profile + Create Pin */}
        <nav className="flex gap-3 justify-between w-full md:w-auto">
          <HiMenu
            fontSize={40}
            className="cursor-pointer md:hidden"
            onClick={() => setToggleSidebar(true)}
          />

          <div className="flex gap-2">
            <Link to={`user-profile/${user?._id}`} className="rounded-lg">
              <img
                src={user.image}
                alt="user"
                className="h-14 max-w-none rounded-lg"
              />
            </Link>
            <Link
              to="/create-pin"
              className="bg-black text-white rounded-lg w-14 h-14 flex justify-center items-center"
            >
              <span className="sr-only">Add pin</span>
              <IoMdAdd />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
