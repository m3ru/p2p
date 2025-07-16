// src/components/SignUp.jsx
import React, { useState } from 'react';
import gun from '../gun';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    gun.user().create(username, password, (ack) => {
      if (ack.err) setMsg(ack.err);
      else setMsg('User created! You can now log in.');
    });
  };

  return (
    <form onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
      <div>{msg}</div>
    </form>
  );
}

