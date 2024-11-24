import { createRoot } from 'react-dom/client';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './index.css';
import router from './router.tsx';
import { RouterProvider } from 'react-router-dom';
import * as Toast from '@radix-ui/react-toast';
import { AppearanceProvider, useAppearance } from './context/appearance.tsx';

function ThemedApp() {
  const { appearance } = useAppearance();
  return (
    <Theme hasBackground={appearance !== 'light'} appearance={appearance}>
      <Toast.Provider swipeDirection="right">
        <RouterProvider router={router} />
      </Toast.Provider>
    </Theme>
  );
}

createRoot(document.getElementById('root')!).render(
  <AppearanceProvider>
    <ThemedApp />
  </AppearanceProvider>
);
