import { useContext } from 'react';

import ctx from './context';

function useAuth() {
  return useContext(ctx);
}

export default useAuth;
