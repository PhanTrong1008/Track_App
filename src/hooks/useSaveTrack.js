import { useContext } from "react";
import { Context as TrackContext } from "../context/TrackContext.js";
import { Context as LocationContext } from "../context/LocationContext.js";
import { navigate } from "../navigationRef.js";

export default () => {
  const { createTrack } = useContext(TrackContext);
  const {
    state: { name, locations },
    reset
  } = useContext(LocationContext);

  const saveTrack = async () => {
    await createTrack(name, locations);
    reset();
    navigate('TrackList');
  };

  return [saveTrack];
};
