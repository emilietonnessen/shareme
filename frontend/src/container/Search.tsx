import MasonryLayout from '../components/MasonryLayout';
import Spinner from '../components/Spinner';
import { PinProps } from '../utils/schemaTypes';

interface SearchProps {
  loading: boolean;
  pins: PinProps[];
  searchTerm: string;
}

const Search = ({ loading, pins, searchTerm }: SearchProps) => {
  return (
    <div>
      <h1 className="text-3xl ml-2 mb-4">Search for images</h1>
      {/* Loader */}
      {loading && <Spinner message="Searching for pins" />}

      {/* Pins */}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}

      {/* No pins */}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl">No pins found</div>
      )}
    </div>
  );
};

export default Search;
