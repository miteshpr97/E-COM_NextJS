// src/app/provider.tsx
'use client'; // Mark this as a Client Component

import { Provider } from 'react-redux';
import store from '../store'; // Adjust the import path to match your store file
<<<<<<< HEAD
import { UserProvider } from "../context/UserContext";
=======
>>>>>>> a8724e40afcaa674325ca0b06a431b72dd907ca8

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
<<<<<<< HEAD
      <UserProvider
      > {children}
      </UserProvider>
=======
      {children}
>>>>>>> a8724e40afcaa674325ca0b06a431b72dd907ca8
    </Provider>
  );
};

export default ReduxProvider;
