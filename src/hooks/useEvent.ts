import { useRef, useCallback, useEffect } from 'react';

export type TUseEventCallbackType = ((...args: Array<any>) => any) | undefined;

interface IUseEventOverload {
  <TF extends TUseEventCallbackType>(callback: TF): TF;
  <TF extends TUseEventCallbackType>(callback: TF): any;
}

export const useEvent: IUseEventOverload = (callback) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback((...args: any) => callbackRef.current?.(...args), []);
};
