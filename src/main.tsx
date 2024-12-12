import React from 'react'
import ReactDOMClient from 'react-dom/client';

// Router
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes';

// Mantine
import { MantineProvider } from '@mantine/core';

// Roast
import { Toaster } from 'react-hot-toast';

// Styles
import "./index.css";
import "./styles/tailwind.css";
import '@mantine/core/styles.css';

const container = document.getElementById('root') as HTMLElement;

// Create the root only once
const root = ReactDOMClient.createRoot(container);

function App() {
  return (
    <MantineProvider>
      <RouterProvider
        router={router} />
      <Toaster />
    </MantineProvider>
  );
}

// Initial render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

