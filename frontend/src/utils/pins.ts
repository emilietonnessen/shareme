import { client } from './../client';

export const addOrRemovePinFromFavorites = (
  id: string,
  addPin: boolean,
  setSavingPin: any,
  setIsSaved: any
) => {
  setSavingPin(true);

  client
    .patch(id, {
      set: {
        saved: addPin,
      },
    })
    .commit()
    .then((data) => {
      setIsSaved(data?.saved);
      setSavingPin(false);
    })
    .catch(() => {
      setIsSaved(false);
    });
};
