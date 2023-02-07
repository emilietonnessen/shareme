import { IoMdSearch } from 'react-icons/io';

interface SearchInputProps {
  searchHandler: () => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

const SearchInput = ({
  searchHandler,
  searchTerm,
  setSearchTerm,
}: SearchInputProps) => {
  return (
    <form className="flex w-full rounded-lg items-center bg-white h-14">
      <IoMdSearch fontSize={21} className="mx-3 hidden sm:block" />
      <div className="flex flex-col sm:border-l-2 sm:border-gray-300 px-3 w-full ">
        <label htmlFor="search" className="text-xs font-bold">
          Search for images
        </label>
        <input
          type="text"
          name="search"
          id="search"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term..."
          value={searchTerm}
          className="text-base h-6 py-2"
        />
      </div>
      <button
        className="bg-gray-300 font-bold text-sm rounded-r-lg h-full px-4 hidden sm:block"
        onClick={(e) => {
          e.preventDefault();
          searchHandler();
        }}
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchInput;
