import { useParams, useSearchParams } from 'react-router-dom';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import { LIVEKIT_URL, getToken } from '../lib/livekit';
import { useState, useEffect } from 'react';

export default function MeetingRoom() {
  const { code } = useParams();
  const [params] = useSearchParams();
  const identity = params.get('identity') || 'guest';
  const [token, setToken] = useState<string>();

  useEffect(() => {
    getToken(code!, identity).then(setToken).catch(console.error);
  }, [code, identity]);

  if (!token) return <div>Connecting...</div>;

  return (
    <LiveKitRoom serverUrl={LIVEKIT_URL} token={token} connect>
      <VideoConference />
    </LiveKitRoom>
  );
}
