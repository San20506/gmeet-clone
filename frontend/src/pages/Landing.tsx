import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = useState('');
  const [recentRooms, setRecentRooms] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('recentRooms');
    if (stored) setRecentRooms(JSON.parse(stored));
  }, []);

  async function handleNewMeeting() {
    const res = await fetch('/api/rooms', { method: 'POST' });
    if (!res.ok) return alert('Could not create room');
    const { roomCode } = await res.json();
    navigate(`/prejoin?room=${roomCode}`);
  }

  async function handleJoin() {
    if (!joinCode.trim()) return;
    const res = await fetch(`/api/rooms/${joinCode}/validate`);
    if (res.status === 404) return alert('Room not found');
    if (res.status === 410) return alert('Meeting has expired');
    navigate(`/prejoin?room=${joinCode}`);
  }

  return (
    <div className="landing">
      <h1>Gmeet</h1>
      <div className="actions">
        <button onClick={handleNewMeeting}>New Meeting</button>
        <div className="join">
          <input
            placeholder="Enter meeting code"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
          />
          <button onClick={handleJoin} disabled={!joinCode.trim()}>Join</button>
        </div>
      </div>
      {recentRooms.length > 0 && (
        <div className="recent">
          <h3>Recent rooms</h3>
          <ul>{recentRooms.map((r) => <li key={r}>{r}</li>)}</ul>
        </div>
      )}
    </div>
  );
}
