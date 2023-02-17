import { GoogleOAuthProvider } from '@react-oauth/google';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Layout from './Layout/Layout';
import LoginPage from './pages/LoginPage';
import { fetchUser } from './utils/fetchUser';

function App() {
  // 🎣 Hooks 🎣
  const navigate = useNavigate();

  // 🦮 Fetch user 🦮
  const user = fetchUser();

  useEffect(() => {
    // If the user is not logged in, then redirect to the login page
    if (!user) navigate('/login');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_API_TOKEN || ''}
    >
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
