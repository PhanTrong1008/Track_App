import { useState, useEffect } from "react";
import {
  Accuracy,
  requestForegroundPermissionsAsync,
  watchPositionAsync
} from "expo-location";
import { call } from "react-native-reanimated";

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);

  // This hook run whenever the TrackCreateScreen renders, React looks at shouldTrack variable
  // When shouldTrack value changes, React will run useLocation in additional time
  useEffect(() => {
    let subscriber;
    const startWatching = async () => {
      try {
        const { granted } = await requestForegroundPermissionsAsync();

        const sub = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10
          },
          callback
        );

        if (!granted) {
          throw new Error("Location permission not granted");
        }
      } catch (e) {
        setErr(e);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
      console.log("stop watching");
    }

    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]);

  return [err];
};
