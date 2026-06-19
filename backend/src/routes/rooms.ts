import { Router } from 'express';
import { createRoom, validateRoom } from '../services/room.service.js';
import { issueToken } from '../services/jwt.service.js';

export const roomsRouter = Router();

roomsRouter.post('/', async (req, res, next) => {
  try {
    const room = await createRoom();
    res.status(201).json({ roomCode: room.code, createdAt: room.createdAt });
  } catch (err) {
    next(err);
  }
});

roomsRouter.get('/:code/validate', async (req, res, next) => {
  try {
    const result = await validateRoom(req.params.code);
    if (!result) return res.status(404).json({ valid: false, error: 'Room not found' });
    if (result.expired) return res.status(410).json({ valid: false, error: 'Meeting has expired' });
    res.json({ valid: true, participantCount: result.count });
  } catch (err) {
    next(err);
  }
});

roomsRouter.get('/:code/token', async (req, res, next) => {
  try {
    const identity = (req.query.identity as string) || `guest-${crypto.randomUUID().slice(0, 4)}`;
    const token = await issueToken(req.params.code, identity);
    res.json({ token });
  } catch (err) {
    next(err);
  }
});
