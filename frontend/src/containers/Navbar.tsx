import { HiMenu } from 'react-icons/hi';
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';

import SearchBar from '../components/Inputs/SearchInput';
import { UserProps } from '../utils/schemaTypes';
import ProfileLink from '../components/Links/ProfileLink';

interface NavbarProps {
  searchHandler: () => void;
  searchTerm: string;
  setSearchTerm: any;
  setToggleSidebar: (toggleSidebar: boolean) => void;
  user: UserProps;
  pathname: string;
}

const Navbar = ({
  searchHandler,
  searchTerm,
  setSearchTerm,
  setToggleSidebar,
  user,
  pathname,
}: NavbarProps) => {
  const shouldNavbarBeFullWidth =
    pathname === '/' ||
    pathname === '/search' ||
    pathname.includes('/category/');

  return (
    <header
      className={`flex flex-col w-full ${
        shouldNavbarBeFullWidth ? '' : 'mx-auto max-w-6xl'
      }`}
    >
      {/* Search bar */}
      <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 p-2 md:py-5 md:px-0 md:flex-row  items-end flex-col-reverse">
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
          <span className="bg-salmon p-3 rounded-full shadow-lg md:hidden">
            <HiMenu
              fontSize={30}
              className="cursor-pointer  text-white"
              onClick={() => setToggleSidebar(true)}
            />
          </span>

          <div className="flex gap-2">
            <ProfileLink
              image={user?.image || ''}
              id={user?._id || ''}
              classesLink="rounded-lg"
              classesImage="h-14 max-w-none rounded-lg"
            />
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
