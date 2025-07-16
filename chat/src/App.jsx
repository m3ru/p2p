import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import SignIn from './components/SignIn';
import Login from './components/Login';
import ChatScreen from './components/ChatScreen';
import './App.css'
import Gun from 'gun';

function App() {
  
  const [user, setUser] = useState(null);

  const gun = Gun(['http://localhost:3000/gun']); // Use your server's address and port

  // Now you can use `gun` for your chat logic

  return (
    <div>
      {!user && (
        <>
          <SignIn/>
          <Login onLogin={setUser} />
        </>
      )}
      {user && <ChatScreen user={user} />}
    </div>
  );
}

export default App;
