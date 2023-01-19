import Masonry from 'react-masonry-css';

import Pin from './Pin';

const breakpointObj = {
  default: 4, // default numbers of columns,
  3000: 6, // On 3000px show 6 columns
  2000: 5, // On 2000px show 5 columns
  1200: 3, // On 1200px show 3 columns
  1000: 2, // On 1000px show 2 columns
  500: 1, // On 500px show 1 columns
};

const MasonryLayout = ({ pins }) => {
  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointObj}>
      {pins?.map((pin) => (
        <Pin key={pin._id} pin={pin} className="w-max" />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
