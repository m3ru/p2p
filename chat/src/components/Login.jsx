// src/components/Login.jsx
import React, { useState } from 'react';
import gun from '../gun';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    gun.user().auth(username, password, (ack) => {
      if (ack.err) setMsg(ack.err);
      else {
        setMsg('Login successful!');
        if (onLogin) onLogin(gun.user());
      }
    });
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
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
      <button type="submit">Login</button>
      <div>{msg}</div>
    </form>
  );
}