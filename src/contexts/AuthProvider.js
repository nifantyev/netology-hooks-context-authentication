import { useState } from 'react';
import useStorage from '../hooks/useStorage';
import AuthContext from './AuthContext';

const AuthProvider = (props) => {
  const [error, setError] = useState(null);
  const [token, setToken] = useStorage(localStorage, 'token');
  const [profile, setProfile] = useStorage(localStorage, 'profile', true);

  const handleLogin = async (login, password) => {
    try {
      setError(null);
      const authResponse = await fetch('http://localhost:7070/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: login,
          password: password,
        }),
      });
      if (!authResponse.ok) {
        if (authResponse.status === 400) {
          const { message } = await authResponse.json();
          throw new Error(message);
        }
        throw new Error('Auth failed');
      }
      const { token } = await authResponse.json();
      setToken(token);

      const profileResponse = await fetch('http://localhost:7070/private/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!profileResponse.ok) {
        throw new Error(
          `${profileResponse.status} ${profileResponse.statusText}`
        );
      }

      const profile = await profileResponse.json();
      setProfile(profile);
    } catch (e) {
      setError(e.message);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setProfile(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleLogout,
        token,
        profile,
        error,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
