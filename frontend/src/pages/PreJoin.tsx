import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { createLocalTracks } from '../lib/livekit';

export default function PreJoin() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const room = params.get('room') || '';
  const videoRef = useRef<HTMLVideoElement>(null);
  const [name, setName] = useState('');
  const [micEnabled, setMicEnabled] = useState(true);
  const [camEnabled, setCamEnabled] = useState(true);

  useEffect(() => {
    if (camEnabled) {
      createLocalTracks({ audio: micEnabled, video: true }).then(([audio, video]) => {
        if (videoRef.current && video) videoRef.current.srcObject = new MediaStream([video.mediaStreamTrack]);
      });
    }
  }, [camEnabled, micEnabled]);

  async function handleJoin() {
    const identity = name.trim() || `guest-${Math.random().toString(36).slice(2, 6)}`;
    const res = await fetch(`/api/rooms/${room}/token?identity=${encodeURIComponent(identity)}`);
    if (!res.ok) return alert('Failed to join');
    navigate(`/meeting/${room}?identity=${encodeURIComponent(identity)}`);
  }

  return (
    <div className="prejoin">
      <video ref={videoRef} autoPlay muted playsInline />
      <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setMicEnabled(!micEnabled)}>{micEnabled ? 'Mute' : 'Unmute'}</button>
      <button onClick={() => setCamEnabled(!camEnabled)}>{camEnabled ? 'Cam Off' : 'Cam On'}</button>
      <button onClick={handleJoin}>Join Now</button>
    </div>
  );
}
