interface RoomRecord {
  code: string;
  status: 'active' | 'expired';
  createdAt: Date;
  endedAt?: Date;
}

const rooms = new Map<string, RoomRecord>();

function generateCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 10; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export async function createRoom(): Promise<RoomRecord> {
  const code = generateCode();
  const room: RoomRecord = { code, status: 'active', createdAt: new Date() };
  rooms.set(code, room);
  return room;
}

export async function validateRoom(code: string): Promise<{ expired: boolean; count: number } | null> {
  const room = rooms.get(code);
  if (!room) return null;
  const expired = Date.now() - room.createdAt.getTime() > 24 * 60 * 60 * 1000;
  return { expired, count: 0 };
}
