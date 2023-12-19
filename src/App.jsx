import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import { PlanetListPage } from './pages/planets/PlanetList';
import { PlanetDetailsPage } from './pages/planets/PlanetDetails';
import { RootPage } from './pages/RootPage';
import { PeopleDetailsPage } from './pages/people/PeopleDetails';
import { PeopleListPage } from './pages/people/PeopleList';
import { getPageNoFromUrl } from './utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StarShipsList } from './pages/starships/StarShipsList';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0
    }
  }
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      {
        path: 'planets',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <PlanetListPage />,
            
          },
          {
            path: ':id',
            element: <PlanetDetailsPage />,
            loader: planetIdLoader
          }
        ]
      },
      {
        path: 'people',
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <PeopleListPage />
          },
          {
            path: ':id',
            element: <PeopleDetailsPage />,
            loader: peopleIdLoader
          }
        ]
      },
      {
        path: 'starships',
        element: <Outlet />,
        children:  [
          {
            index: true,
            element: <StarShipsList />
          }
        ]     
       }
    ]
  }
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

function planetListLoader(opts) {
  const pageNo = getPageNoFromUrl(opts.request.url) || 1;

  return fetch(`https://swapi.dev/api/planets/?page=${pageNo}`).then(res =>
    res.json()
  );
}

function planetIdLoader({ params }) {
  return fetch(`https://swapi.dev/api/planets/${params.id}/`).then(res =>
    res.json()
  );
}

function peopleListLoader() {
  return fetch('https://swapi.dev/api/people/').then(res => res.json());
}

function peopleIdLoader({ params }) {
  return fetch(`https://swapi.dev/api/people/${params.id}/`).then(res =>
    res.json()
  );
}
