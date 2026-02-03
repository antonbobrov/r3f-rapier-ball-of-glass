import { Suspense } from 'react';

import { Main } from '@/components/Main';

const Home = () => (
  <Suspense>
    <div className="scene">
      <Suspense fallback={null}>
        <Main />
      </Suspense>
    </div>
  </Suspense>
);

export default Home;
