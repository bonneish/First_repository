import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

export function PeopleListPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['people/list'],
    queryFn: async () => {
      const res = await fetch('https://swapi.dev/api/people/');

      if (res.ok) {
        return res.json();
      }

      return Promise.reject('Could not fetch data');
    }
  });

  if (isLoading) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <span className="loader"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <p>{String(error)}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>People List</h1>
      <ol>
        {data?.results?.map(p => {
          const id = p.url
            .replace('https://swapi.dev/api/people/', '')
            .replace('/', '');

          return (
            <li key={id}>
              <Link to={`/people/${id}`}>{p.name}</Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
