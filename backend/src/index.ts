import express from 'express';
import cors from 'cors';
import { healthRouter } from './routes/health.js';
import { roomsRouter } from './routes/rooms.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api/rooms', roomsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API server listening on :${PORT}`);
});
