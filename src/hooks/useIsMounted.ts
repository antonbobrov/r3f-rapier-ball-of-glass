import { useEffect, useState } from 'react';

export function useIsMounted() {
  const [is, setIs] = useState(false);

  useEffect(() => setIs(true), []);

  return is;
}
