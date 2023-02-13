import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Comments from '../components/Comments';
import DeleteButton from '../components/DeleteButton';
import DownloadLink from '../components/DownloadLink';
import ErrorBox from '../components/ErrorBox';
import ExternalLink from '../components/ExternalLink';
import HeartIcon from '../components/HeartIcon';
import InfoBox from '../components/InfoBox';
import MasonryLayout from '../components/MasonryLayout';
import Spinner from '../components/Spinner';
import UserProfileLink from '../components/UserProfileLink';
import { CommentsProps, PinProps, UserProps } from '../utils/schemaTypes';
import { client, urlFor } from '../client';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';

const PinDetail = ({ user }: { user: UserProps }) => {
  // 🏡 Pin Details - State 🏡
  const [pinDetail, setPinDetail] = useState<PinProps | null>(null);
  const [isPinDetailsLoading, setIsPinDetailsLoading] = useState(false);
  const [isPinDetailsError, setIsPinDetailsError] = useState(false);

  // 🏡 Comments - State 🏡
  const [comments, setComments] = useState<CommentsProps[]>([]);

  // 🏡 Adding Comments - state 🏡
  const [inputValue, setInputValue] = useState('');
  const [isAddingCommentLoading, setIsAddingCommentLoading] = useState(false);
  const [isAddingCommentError, setIsAddingCommentError] = useState(false);

  // 🏡 Deleting Comments - state 🏡
  const [isDeletingCommentLoading, setIsDeletingCommentLoading] =
    useState(false);
  const [isDeletingCommentError, setIsDeletingCommentError] = useState(false);

  // 🏡 More pins - State 🏡
  const [pins, setPins] = useState<PinProps[] | null>(null);
  const [isPinsLoading, setIsPinsLoading] = useState(false);
  const [isErrorPins, setIsErrorPins] = useState(false);

  // 🎣 Hooks 🎣
  const { pinId } = useParams();
  const navigate = useNavigate();

  // ✉️ Fetch pin details handler ✉️
  const fetchPinDetails = () => {
    if (pinId) {
      setIsPinDetailsLoading(true);
      setIsPinDetailsError(false);
      let query = pinDetailQuery(pinId);

      if (query) {
        client
          .fetch(query)
          .then((data) => {
            setPinDetail(data[0]);

            // Fetch images from same category
            if (data[0]) {
              query = pinDetailMorePinQuery(data[0]);
              setIsPinsLoading(true);
              setIsErrorPins(false);

              client
                .fetch(query)
                .then((response) => {
                  setPins(response);
                  setIsPinsLoading(false);
                })
                .catch(() => {
                  setIsPinsLoading(false);
                  setIsErrorPins(true);
                });
            }

            // Set comments
            if (data[0]?.comments) {
              setComments(data[0]?.comments);
            }

            setIsPinDetailsLoading(false);
          })
          .catch(() => {
            setIsPinDetailsLoading(false);
            setIsPinDetailsError(true);
          });
      }
    }
  };

  // Fetch pin details every time pinId changes
  useEffect(() => {
    fetchPinDetails();
  }, [pinId]);

  // TODO: Make link more distinctive

  // 🗨️ Add comments handler 🗨️
  const addComment = () => {
    if (inputValue && pinId) {
      setIsAddingCommentLoading(true);
      setIsAddingCommentError(false);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
          {
            comment: inputValue,
            _key: uuidv4(),
            postedBy: { _type: 'postedBy', _ref: user?._id },
          },
        ])
        .commit()
        .then(() => {
          setInputValue('');
          setIsAddingCommentLoading(false);
          setComments([
            ...comments,
            {
              comment: inputValue,
              _key: uuidv4(),
              postedBy: {
                _type: 'postedBy',
                _ref: user?._id,
                userName: user?.userName,
                image: user?.image,
              },
            },
          ]);
        })
        .catch(() => {
          setIsAddingCommentError(true);
          setIsAddingCommentLoading(false);
        });
    }
  };

  // 🗑️ Delete Comment 🗑️
  const deleteComment = (id: string) => {
    setIsDeletingCommentLoading(true);
    setIsDeletingCommentError(false);
    // TODO: Add warning
    client
      .patch(pinDetail?._id || '')
      .unset([`comments[_key=="${id}"]`])
      .commit()
      .then((data) => {
        setIsDeletingCommentLoading(false);
        setComments(data?.comments);
        // TODO: Display success message
      })
      .catch(() => {
        setIsDeletingCommentError(true);
        setIsDeletingCommentLoading(false);
      });
  };

  // 🗑️ Delete pin 🗑️
  const deletePin = (id: string) => {
    // TODO: add warning in case user miss clicked
    client
      .delete(id)
      .then(() => {
        navigate('/');
        // 1: Navigate to home
        // 2: Display success message
      })
      .catch(() => {
        // 1: Display error message
      });
  };

  // FIXME: Make sure the page is WCAG optimized
  // FIXME: I think the word destination is a bit misleading and confusing
  return (
    <div className="flex flex-col gap-16 mx-auto mt-10 max-w-6xl lg:w-full mb-32">
      {isPinDetailsLoading ? (
        <Spinner />
      ) : isPinDetailsError ? (
        <ErrorBox message="Unable to load pin details. Please try again later." />
      ) : (
        <div className="flex flex-col xl:flex-row  gap-6 justify-center">
          {/* Image */}
          <div className="flex flex-1 justify-center items-center md:items-start ">
            <img
              src={
                pinDetail?.image && urlFor(pinDetail.image).width(1100).url()
              }
              alt={pinDetail?.about}
              className=""
            />
          </div>

          {/* Content container */}
          <div className="flex flex-1 flex-col gap-10 p-5 bg-white  rounded-md">
            {/* Download and Link row */}
            <div className="flex items-center justify-between">
              <div className="flex gap-4 justify-between w-full items-start">
                {/* Profile link */}
                <UserProfileLink
                  id={pinDetail?.postedBy?._id || ''}
                  image={pinDetail?.postedBy?.image || ''}
                  userName={
                    <span className="flex flex-col">
                      <span className="text-xs text-gray-600">
                        Uploaded by{' '}
                      </span>
                      <span className="font-bold">
                        {pinDetail?.postedBy?.userName}
                      </span>
                    </span>
                  }
                  classesLink="flex gap-2 items-center rounded-lg bg-gray-200 bg-opacity-80 hover:bg-opacity-100 focus:opacity-100 py-2 px-4 transition-all"
                  classesImage="w-12 h-12 rounded-full object-cover"
                  classesText="text-sm"
                />
                <div className="flex gap-4">
                  {pinDetail?.postedBy?._id === user?._id && (
                    <DeleteButton
                      screenReaderMessage={`Delete your "${pinDetail?.title}" image`}
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePin(pinDetail?.postedBy?._id || '');
                      }}
                    />
                  )}
                  <DownloadLink
                    image={`${pinDetail?.image?.asset?.url}?dl=`}
                    about={pinDetail?.about || ''}
                    isPinDetailPage
                  />
                  <ExternalLink
                    href={pinDetail?.destination || ''}
                    title={`Open image origin of "${pinDetail?.title}"`}
                  />
                  <HeartIcon
                    id={pinId || ''}
                    saved={pinDetail?.saved || false}
                    isPinDetailPage
                  />
                </div>
              </div>
            </div>

            {/* Title and Description */}
            <div className="flex gap-2 flex-col items-start">
              <h1 className="text-4xl font-bold break-words">
                {pinDetail?.title}
              </h1>
              <p>{pinDetail?.about}</p>
            </div>

            {/* Comments */}
            <Comments
              pinDetail={pinDetail}
              comments={comments}
              setInputValue={setInputValue}
              addComment={addComment}
              isAddingCommentLoading={isAddingCommentLoading}
              inputValue={inputValue}
              isAddingCommentError={isAddingCommentError}
              deleteComment={deleteComment}
              userId={user?._id || ''}
            />
          </div>
        </div>
      )}

      {/* More like this  */}
      <div className="rounded-md px-4 py-10">
        <h2 className="text-center text-3xl mb-8">More images like this</h2>
        <div aria-live="polite" className="flex flex-wrap">
          {isPinsLoading ? (
            <Spinner />
          ) : isErrorPins ? (
            <div className="flex w-full justify-center">
              <ErrorBox message="Not able to load images in the same category. Please try again later." />
            </div>
          ) : pins?.length ? (
            <MasonryLayout pins={pins.slice(0, 15)} />
          ) : (
            <div className="flex w-full justify-center">
              <InfoBox message="We could not find more images in the same category." />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PinDetail;
