import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { PinProps } from '../utils/schemaTypes';

interface SearchProps {
  loading: boolean;
  pins: PinProps[];
  searchTerm: string;
}

const Search = ({ loading, pins, searchTerm }: SearchProps) => {
  return (
    <div>
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
