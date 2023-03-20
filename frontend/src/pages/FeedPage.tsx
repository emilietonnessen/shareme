import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ErrorBox from '../components/NoticeBoxes/ErrorBox';
import MasonryLayout from '../containers/MasonryLayout';
import Spinner from '../components/Spinners/Spinner';
import { PinProps } from '../utils/schemaTypes';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';

const FeedPage = () => {
  // 🏡 Local state 🏡
  const [loading, setLoading] = useState<boolean>(false);
  const [pins, setPins] = useState<PinProps[]>([]);
  const [error, setError] = useState(false);
  const [savingPin, setSavingPin] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // 🎣 Hooks 🎣
  const { categoryId } = useParams();

  // 🦮 Fetch pins either based on category or all pins 🦮
  useEffect(() => {
    setLoading(true);
    setError(false);

    if (categoryId) {
      const query = searchQuery(categoryId);

      client
        .fetch(query)
        .then((data) => {
          setPins(data);
        })
        .catch(() => {
          setError(true);
        });

      setLoading(false);
    } else {
      client
        .fetch(feedQuery)
        .then((data) => {
          setPins(data);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
        });
    }

    setLoading(false);
  }, [categoryId]);

  return (
    <main>
      <h1 className="text-3xl ml-2 mb-4">
        Explore and share pins with your friends
      </h1>
      <div aria-live="polite">
        {loading ? (
          <Spinner message="Loading pins" />
        ) : error ? (
          <ErrorBox message="Something bad happened, try again later.." />
        ) : !pins?.length ? (
          <div className="text-lg text-gray-600 p-2">No pins available.</div>
        ) : (
          <div className="flex flex-col gap-4">
            {pins && <MasonryLayout pins={pins} />}
          </div>
        )}
      </div>
    </main>
  );
};

export default FeedPage;
