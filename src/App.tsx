import { useEffect, useState } from 'react';
import type { AuthUser } from 'aws-amplify/auth';
import { getUser, handleSignOut } from './auth';

function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser().then(u => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) return <div>Please sign in</div>;

  return (
    <div>
      <h1>Welcome {user.username}</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default App;
