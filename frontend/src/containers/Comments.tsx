import DeleteButton from '../components/Buttons/DeleteButton';
import SpinnerSmall from '../components/Spinners/SpinnerSmall';
import ProfileLink from '../components/Links/ProfileLink';
import { CommentsProps, PinProps } from '../utils/schemaTypes';

interface CommentsComponentProps {
  pinDetail: PinProps | null;
  setInputValue: (value: string) => void;
  addComment: () => void;
  isAddingCommentLoading: boolean;
  inputValue: string;
  deleteComment: any;
  userId: string;
  comments: CommentsProps[];
  isDeletingCommentLoading: boolean;
}

const Comments = ({
  pinDetail,
  setInputValue,
  addComment,
  isAddingCommentLoading,
  inputValue,
  deleteComment,
  userId,
  comments,
  isDeletingCommentLoading,
}: CommentsComponentProps) => {
  return (
    <div className="flex flex-col h-full justify-between ">
      <div className="">
        {/* Headline */}
        <h2 className="text-2xl md:text-3xl">Comments</h2>

        {/* Comments */}
        <ul className="">
          {comments?.map((comment, i) => (
            <li
              key={i}
              className="flex gap-2 justify-between mt-5 items-center bg-gray-100 p-4 rounded-lg"
            >
              <ProfileLink
                id={comment?.postedBy?._id || ''}
                image={comment?.postedBy?.image || ''}
                classesLink="flex"
                classesImage="w-10 h-10 rounded-full cursor-pointer"
                classesText="flex flex-col"
              />
              <div className="flex-1">
                <p className="font-bold text-sm">
                  {comment?.postedBy?.userName}
                </p>
                <p>{comment?.comment}</p>
              </div>
              {pinDetail?.postedBy?._id === userId && (
                <DeleteButton
                  screenReaderMessage={`Delete your "${comment?.comment}" comment`}
                  loading={isDeletingCommentLoading}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteComment(comment?._key || '');
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Create comments */}
      <form className="flex mt-6 gap-3 w-full justify-center items-end">
        <img
          src={pinDetail?.postedBy?.image}
          alt=""
          className="w-11 h-11 rounded-full hidden sm:block"
        />
        <div className="flex flex-col flex-1">
          <label htmlFor="comment" className="ml-2 text-sm font-bold">
            Add comment
          </label>
          <input
            type="text"
            name="comment"
            id="comment"
            placeholder="What do you think of this image?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 border-gray-200 border-2 px-2 rounded-md block leading-10 placeholder:text-gray-500"
          />
        </div>
        {isAddingCommentLoading ? (
          <div className="h-11 flex items-center w-20 justify-center">
            <SpinnerSmall />
          </div>
        ) : (
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              addComment();
            }}
            className="bg-salmon text-white rounded-md px-2 sm:px-0 py-2 font-semibold text-base h-11 sm:w-20"
          >
            Post
          </button>
        )}
      </form>
    </div>
  );
};

export default Comments;
