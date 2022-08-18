import { useState, useEffect } from 'react';

import ctx from './context';

function AuthProvider({ children }: any) {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const isAuthenticated = () => isSignedIn;

  return (
    <ctx.Provider
      value={{
        isAuthenticated,
        setIsSignedIn
      }}
    >
      {children}
    </ctx.Provider>
  );
}

export default AuthProvider;
