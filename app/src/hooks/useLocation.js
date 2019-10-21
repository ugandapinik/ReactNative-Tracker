import { useState, useEffect } from 'react';
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync
} from 'expo-location';

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);

  useEffect(() => {
    let subscriber;

    const startWatching = async () => {
      try {
        await requestPermissionsAsync();
        // access the subscriber property
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10
          },
          callback
        );
      } catch (e) {
        setErr(e);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriber) {
        // remove allows us to stop tracking
        subscriber.remove();
      }
      subscriber = null;
    }

    return () => {
      if (subscriber) {
        // remove allows us to stop tracking
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]); // each time shouldTrack changes, rerun useEffect

  return [err];
};
