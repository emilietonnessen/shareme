import { TiHeart, TiHeartOutline } from 'react-icons/ti';

import SpinnerSmall from '../Spinners/SpinnerSmall';

interface HeartButtonProps {
  classes: string;
  description: string;
  iconSize: number;
  id: string;
  isSaved: boolean;
  loading: boolean;
  onClick: (
    id: string,
    addPin: boolean,
    setSavingPin: any,
    setIsSaved: any
  ) => void;
  setIsSaved: any;
}

const HearthButton = ({
  classes,
  description,
  iconSize,
  id,
  isSaved,
  loading,
  onClick,
  setIsSaved,
}: HeartButtonProps) => {
  return (
    <>
      {/* ❤️ Heart icon ❤️ */}
      {isSaved ? (
        <button
          className={`${classes} rounded-full cursor-pointer`}
          onClick={(e) => {
            e.stopPropagation();
            setIsSaved(false);
            onClick(id, false, loading, setIsSaved);
          }}
          aria-live="polite"
        >
          {loading ? (
            <>
              <SpinnerSmall />

              <span className="sr-only">Loading</span>
            </>
          ) : (
            <>
              <TiHeart fontSize={iconSize} className="text-salmon" />
              <span className="sr-only">
                Remove image of "{description}" from favorites
              </span>
            </>
          )}
        </button>
      ) : (
        <button
          type="button"
          className={`${classes} rounded-full cursor-pointer`}
          onClick={(e) => {
            e.stopPropagation();
            onClick(id, true, loading, setIsSaved);
            setIsSaved(true);
          }}
          aria-live="polite"
        >
          {loading ? (
            <>
              <SpinnerSmall />
              <span className="sr-only">Loading</span>
            </>
          ) : (
            <>
              <TiHeartOutline fontSize={classes ? 25 : 20} className="m-0" />
              <span className="sr-only">
                Add image of "{description}" to favorites
              </span>
            </>
          )}
        </button>
      )}
    </>
  );
};

export default HearthButton;
