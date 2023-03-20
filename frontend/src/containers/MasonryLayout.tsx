import { useState } from 'react';
import Masonry from 'react-masonry-css';

import PinCard from '../components/Cards/PinCard';
import { PinProps } from '../utils/schemaTypes';

const breakpointObj = {
  default: 4, // default numbers of columns,
  3000: 6, // On 3000px show 6 columns
  2000: 5, // On 2000px show 5 columns
  1200: 3, // On 1200px show 3 columns
  1000: 2, // On 1000px show 2 columns
  500: 1, // On 500px show 1 columns
};

interface MasonryLayoutProps {
  pins: PinProps[];
}

// TODO: Control the "favorites" state here?
/* 
  user: {
    userName: "Emilie",
    image: "www.tonnessen.com/image.jpg"
    savedPins: ["123456789"]
  }

*/
const MasonryLayout = ({ pins }: MasonryLayoutProps) => {
  // 🏡 Local state 🏡
  const [savingPin, setSavingPin] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const saveRemovePin = (pinId: string) => {
    // Call client and save or remove the pin from the savedPin array you can find in the user object
  };

  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointObj}>
      {pins?.map((pin) => (
        <PinCard
          key={pin._id}
          pin={pin}
          savingPin={savingPin}
          isSaved={pin.saved}
          setIsSaved={setIsSaved}
        />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
