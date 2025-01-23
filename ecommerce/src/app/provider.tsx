// src/app/provider.tsx
'use client'; // Mark this as a Client Component

import { Provider } from 'react-redux';
import store from '../store'; // Adjust the import path to match your store file

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default ReduxProvider;
