import { useEffect, useState } from 'react';
import { managedEventListener } from './utils';

const initialState: Omit<DeviceOrientationEvent, keyof Event> = {
  alpha: null,
  beta: null,
  gamma: null,
  absolute: false,
};

/**
 * Tracks physical orientation of the device.
 *
 * @returns {DeviceOrientationEvent} An instance of [`DeviceOrientationEventInit`](https://w3c.github.io/deviceorientation/#dictdef-deviceorientationeventinit), constructed without parameters by default.
 * @see [`DeviceOrientationEvent`](https://developer.mozilla.org/docs/Web/API/DeviceOrientationEvent)
 *
 * @example
 * const Example = () => {
 *   const { alpha, beta, gamma, absolute } = useDeviceOrientation();
 *   // ...
 * };
 */
export default function useDeviceOrientation() {
  const [orientation, setOrientation] = useState(initialState);

  useEffect(
    () =>
      managedEventListener(window, 'deviceorientation', ((
        event: DeviceOrientationEvent,
      ) => {
        setOrientation(event);
      }) as EventListener),
    [],
  );

  return orientation;
}