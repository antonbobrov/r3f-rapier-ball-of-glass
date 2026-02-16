'use client';

import { Main } from '@/components/Main';
import { useIsMounted } from '@/hooks/useIsMounted';

const Home = () => {
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="scene">
      <Main />
    </div>
  );
};

export default Home;
