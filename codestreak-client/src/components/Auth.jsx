import { useState } from 'react';
import { auth, provider } from '../services/firebase';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCred => setUser(userCred.user))
      .catch(err => console.log(err.message));
  };

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCred => setUser(userCred.user))
      .catch(err => console.log(err.message));
  };

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then(userCred => setUser(userCred.user))
      .catch(err => console.log(err.message));
  };

  const logout = () => {
    signOut(auth).then(() => setUser(null));
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-sm mx-auto mt-8">
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
            Logout
          </button>
        </div>
      ) : (
        <>
          <input
            className="border px-3 py-2 mb-2 w-full"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border px-3 py-2 mb-2 w-full"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-2">
            <button onClick={login} className="bg-blue-500 text-white px-4 py-2 rounded">
              Login
            </button>
            <button onClick={register} className="bg-green-500 text-white px-4 py-2 rounded">
              Register
            </button>
          </div>
          <button onClick={googleLogin} className="mt-4 bg-gray-700 text-white px-4 py-2 rounded w-full">
            Sign in with Google
          </button>
        </>
      )}
    </div>
  );
}

export default Auth;
