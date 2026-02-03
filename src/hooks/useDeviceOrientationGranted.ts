import { useEffect, useState } from 'react';

import { useEvent } from './useEvent';

declare global {
  interface Window {
    DeviceOrientationEvent: {
      requestPermission: () => Promise<'granted' | 'denied'>;
    };
  }
}

type Listener = (value: boolean) => void;

let granted = false;
let listeners: Listener[] = [];

export function useDeviceOrientationGranted() {
  const [value, setValue] = useState(granted);
  const [needsPermission, setNeedsPermission] = useState(false);

  const request = useEvent(() => {
    if (!needsPermission) {
      return;
    }

    window.DeviceOrientationEvent.requestPermission()
      .then((result) => {
        granted = result === 'granted';

        if (granted) {
          listeners.forEach((l) => l(granted));
        }
      })
      .catch(() => setNeedsPermission(false));
  });

  useEffect(() => {
    const hasRequest =
      'DeviceOrientationEvent' in window &&
      typeof window.DeviceOrientationEvent.requestPermission === 'function';

    if (!hasRequest) {
      return undefined;
    }

    if (granted) {
      setValue(true);
      setNeedsPermission(false);

      return undefined;
    }

    setValue(false);
    setNeedsPermission(true);

    const listener: Listener = (next) => {
      setNeedsPermission(false);
      setValue(next);
    };

    listeners.push(listener);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  return { granted: value, needsPermission, request };
}
