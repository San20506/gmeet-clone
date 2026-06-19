import { AccessToken } from 'livekit-server-sdk';

const API_KEY = process.env.LIVEKIT_API_KEY || 'devkey';
const API_SECRET = process.env.LIVEKIT_API_SECRET || 'devsecret';

export async function issueToken(room: string, identity: string): Promise<string> {
  const at = new AccessToken(API_KEY, API_SECRET, {
    identity,
    ttl: '1h',
  });
  at.addGrant({ roomJoin: true, room });
  return at.toJwt();
}
