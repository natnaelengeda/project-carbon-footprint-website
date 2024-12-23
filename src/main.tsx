import React from 'react'
import ReactDOMClient from 'react-dom/client';

// Router
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';

// Mantine
import { MantineProvider } from '@mantine/core';

// Toaster
import { Toaster } from 'react-hot-toast';

// Skeleton
import { SkeletonTheme } from 'react-loading-skeleton'

// State
import { Provider } from 'react-redux';
import { persistor, store } from "./store";
import { PersistGate } from 'redux-persist/integration/react';

// Styles
import "./index.css";
import "./styles/tailwind.css";
import '@mantine/core/styles.css';
import 'react-loading-skeleton/dist/skeleton.css'

const container = document.getElementById('root') as HTMLElement;

// Create the root only once
const root = ReactDOMClient.createRoot(container);

function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}>
        <MantineProvider>
          <SkeletonTheme
            baseColor="#11001415"
            highlightColor="#35D36A">
            <RouterProvider
              router={router} />
            <Toaster />
          </SkeletonTheme>
        </MantineProvider>
      </PersistGate>
    </Provider>
  );
}

// Initial render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

