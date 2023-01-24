import { Link, useParams } from 'react-router-dom';
import { MdDownloadForOffline } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import { client, urlFor } from './../client';
import { pinDetailMorePinQuery, pinDetailQuery } from './../utils/data';

const PinDetail = ({ user }) => {
  // 🏡 Local state 🏡
  const [pins, setPins] = useState(null);
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  // 🎣 Hooks 🎣
  const { pinId } = useParams();

  // ✉️ Fetch pin details handler ✉️
  const fetchPinDetails = () => {
    let query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);

        if (data[0]) {
          query = pinDetailMorePinQuery(data[0]);

          client.fetch(query).then((response) => {
            setPins(response);
          });
        }
      });
    }
  };

  // Fetch pin details every time pinId changes
  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  // 🗨️ Add comments handler 🗨️
  // FIXME: You have to wait and reload multiple times to get the new comment. Same with when you add pins. Check how to fix this.
  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
          {
            comment,
            _key: uuidv4(),
            postedBy: { _type: 'postedBy', _ref: user._id },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment('');
          setAddingComment(false);
          window.location.reload();
        });
    }
  };

  // Loading handler
  // FIXME: Don't think this is the best method of doing this.
  if (!pinDetail) {
    return <Spinner message="Loading pin..." />;
  }

  // FIXME: Make sure the page is WCAG optimized
  // FIXME: I think the word destination is a bit misleading and confusing
  return (
    <div
      className="flex xl:flex-row flex-col m-auto bg-white"
      style={{ maxWidth: '1500px', borderRadius: '32px' }}
    >
      {/* Image */}
      <div className="flex justify-center items-center md:items-start flex-initial ">
        <img
          src={pinDetail?.image && urlFor(pinDetail.image).url()}
          alt="user-post"
          className="rounded-t-3xl rounded-b-lg"
        />
      </div>

      <div className="w-full p-5 flex-1 xl:min-w-620">
        {/* Download and Link row */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <a
              href={`${pinDetail.image?.asset?.url}?dl=`}
              download
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
            >
              <MdDownloadForOffline />
            </a>
          </div>
          <a href={pinDetail.destination} target="_blank" rel="noreferrer">
            {pinDetail.destination}
          </a>
        </div>

        {/* Title and Description */}
        <div>
          <h1 className="text-4xl font-bold break-words mt-3">
            {pinDetail.title}
          </h1>
          <p className="mt-3">{pinDetail.about}</p>
        </div>

        {/* Profile link */}
        {/* TODO: Make this its own component as its copied from Pin.jsx and on line 130*/}
        <Link
          to={`user-profile/${pinDetail.postedBy?._id}`}
          className="flex gap-2 mt-5 items-center bg-white rounded-lg"
        >
          <img
            src={pinDetail.postedBy?.image}
            alt="user-profile"
            className="w-8 h-8 rounded-full object-cover"
          />
          <p className="font-semibold capitalize">
            {pinDetail.postedBy?.userName}
          </p>
        </Link>

        {/* Comments */}
        <h2 className="mt-5 text-2xl">Comments</h2>
        <div className="max-h-370 overflow-y-auto">
          {pinDetail?.comments?.map((comment, i) => (
            <div
              key={i}
              className="flex gap-2 mt-5 items-center bg-white rounded-lg"
            >
              <img
                src={comment.postedBy.image}
                alt="user-profile"
                className="w-10 h-10 rounded-full cursor-pointer"
              />
              <div className="flex flex-col">
                <p className="font-bold">{comment.postedBy.userName}</p>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Create comments */}
        <div className="flex flex-wrap mt-6 gap-3">
          <Link to={`user-profile/${pinDetail.postedBy?._id}`}>
            <img
              src={pinDetail.postedBy?.image}
              alt="user-profile"
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          </Link>
          <input
            type="text"
            name="comment"
            id="comment"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
          />
          <button
            type="button"
            onClick={addComment}
            className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
          >
            {addingComment ? 'Posting the comment' : 'Post'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PinDetail;
