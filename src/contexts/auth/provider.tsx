import { useState, useEffect } from 'react';
import { IKeyboardItem } from '../../server/models';

import ctx from './context';

function AppProvider({ children }: any) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [editedKeyboardData, setEditedKeyboardData] = useState<IKeyboardItem[] | null>(null);

  const isAuthenticated = () => isSignedIn;

  const getEditedKeyboardData = () => editedKeyboardData;

  return (
    <ctx.Provider
      value={{
        isAuthenticated,
        setIsSignedIn,
        getEditedKeyboardData,
        setEditedKeyboardData
      }}
    >
      {children}
    </ctx.Provider>
  );
}

export default AppProvider;
