import { createBrowserRouter } from 'react-router-dom';
import ROUTES from './constants/ROUTES';
import App from './App';
import LandingPage from './Pages/LandingPage';
import ErrorPage from './Pages/ErrorPage';
import NotFoundPage from './Pages/NotFoundPage';
import BroadcastPage from './Pages/BroadcastPage';
import StreamPage from './Pages/StreamPage';

const router = createBrowserRouter([
  {
    path: ROUTES.root,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        errorElement: <ErrorPage />,
        element: <LandingPage />,
      },
      {
        path: ROUTES.broadcast,
        errorElement: <ErrorPage />,
        element: <BroadcastPage />,
      },
      {
        path: ROUTES.stream,
        errorElement: <ErrorPage />,
        element: <StreamPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
