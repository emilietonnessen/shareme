import { useState, useEffect } from 'react';

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { client } from './../client';
import { feedQuery, searchQuery } from './../utils/data';

const Search = ({ searchTerm }) => {
  // 🏡 Local state 🏡
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🎣 Hooks 🎣

  useEffect(() => {
    if (searchTerm) {
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
  }, [searchTerm]);

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
