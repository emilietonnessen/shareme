import { NavLink } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';

import logo from '../assets/logo.png';
import { categories } from '../utils/data';

interface SidebarProps {
  closeToggle?: (toggle: boolean) => void;
}

const Sidebar = ({ closeToggle }: SidebarProps) => {
  const isNotActiveStyle =
    'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize';
  const isActiveStyle =
    'flex items-center px-5 gap-3 font-bold transition-all duration-200 ease-in-out capitalize';

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <div className="flex flex-col px-5 gap-2 mb-6 pt-1 w-190 items-center justify-start">
          <NavLink
            to="/"
            onClick={handleCloseSidebar}
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
          >
            <div className="flex flex-col px-5 gap-2 pt-1 w-190 items-center justify-start">
              <img src={logo} alt="shareme logo" className="w-full my-6" />
              <div className="flex flex-row gap-2 justify-start items-center w-full">
                <RiHomeFill />
                Home
              </div>
            </div>
          </NavLink>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover categories
          </h3>
          <nav className="flex flex-col gap-5">
            {categories.slice(0, categories.length - 1).map((category) => (
              <NavLink
                to={`/category/${category.name}`}
                className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
                onClick={handleCloseSidebar}
                key={category.name}
              >
                <img
                  src={category?.image}
                  alt=""
                  role="presentation"
                  className="w-8 h-8 rounded-full shadow-sm"
                />
                {category.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
