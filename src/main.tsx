import React from 'react'
import ReactDOMClient from 'react-dom/client';

// Router
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';

// Mantine
import { MantineProvider } from '@mantine/core';

// Roast
import { Toaster } from 'react-hot-toast';

// State
import { Provider } from 'react-redux';
import { persistor, store } from "./store";
import { PersistGate } from 'redux-persist/integration/react';

// Styles
import "./index.css";
import "./styles/tailwind.css";
import '@mantine/core/styles.css';

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
          <RouterProvider
            router={router} />
          <Toaster />
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

