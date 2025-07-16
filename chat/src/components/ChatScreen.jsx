// src/components/ChatScreen.jsx
import React, { useState, useEffect, useRef } from 'react';

// Replace with your actual users and their public keys
const users = [
  { alias: 'meru', pub: "VUVpSOKTtiBAxxj_SMiD_9e4ypjMzfpPWHNQYDwVN7A.K6WGLdtYTpyfMhAbGU7jpb8ngOZUiYC6iBAWCXJmiuw"},
  { alias: 'anushka', pub: "JzLDUAFTYZhqdTOhmfAoTPzLbL4u4pyAylCDYPHTZOg.5JS-Ngh80nD49lC6uPQ8a8l0gcEewF22x7NxpMiyKqM"},
];

export default function ChatScreen({ user }) {
  const [activeRecipient, setActiveRecipient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const listenerRef = useRef();

  // Set up listener for incoming messages when recipient changes
  useEffect(() => {
    setMessages([]);
    if (!activeRecipient) return;

    // Remove previous listener if any
    if (listenerRef.current) listenerRef.current.off?.();

    // Listen for messages from the selected recipient
    window.listening(activeRecipient);

    // Patch: Collect messages from console.log
    // We'll monkey-patch console.log to also update our state
    const origLog = console.log;
    console.log = function (...args) {
      if (args[0] === 'Decrypted message:') {
        setMessages(msgs => [...msgs, { from: activeRecipient, text: args[1] }]);
      }
      origLog.apply(console, args);
    };

    // Cleanup
    return () => {
      console.log = origLog;
    };
  }, [activeRecipient]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !activeRecipient) return;
    window.sendPM(activeRecipient, input);
    setMessages(msgs => [...msgs, { from: user.is.pub, text: input }]);
    setInput('');
  };

  return (
    <div style={{ display: 'flex', height: '80vh', border: '1px solid #ccc' }}>
      {/* Sidebar */}
      <div style={{ width: 200, borderRight: '1px solid #ccc', padding: 10 }}>
        <h3>Users</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users
            .filter(u => u.pub !== user.is.pub)
            .map(u => (
              <li
                key={u.pub}
                style={{
                  cursor: 'pointer',
                  fontWeight: activeRecipient === u.pub ? 'bold' : 'normal',
                  marginBottom: 8,
                }}
                onClick={() => setActiveRecipient(u.pub)}
              >
                {u.alias}
              </li>
            ))}
        </ul>
      </div>
      {/* Chat area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, padding: 10, overflowY: 'auto', background: '#f9f9f9' }}>
          {activeRecipient ? (
            messages.map((m, i) => (
              <div
                key={i}
                style={{
                  textAlign: m.from === user.is.pub ? 'right' : 'left',
                  margin: '4px 0',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    padding: '6px 12px',
                    borderRadius: 12,
                    background: m.from === user.is.pub ? '#d1e7dd' : '#e2e3e5',
                  }}
                >
                  {m.text}
                </span>
              </div>
            ))
          ) : (
            <div>Select a user to start chatting.</div>
          )}
        </div>
        {activeRecipient && (
          <form onSubmit={handleSend} style={{ display: 'flex', padding: 10, borderTop: '1px solid #ccc' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message..."
              style={{ flex: 1, marginRight: 8, padding: 8 }}
            />
            <button type="submit" style={{ padding: '8px 16px' }}>Send</button>
          </form>
        )}
      </div>
    </div>
  );
}
