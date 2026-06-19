import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import PreJoin from './pages/PreJoin';
import MeetingRoom from './pages/MeetingRoom';
import MeetingSummary from './pages/MeetingSummary';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/prejoin" element={<PreJoin />} />
      <Route path="/meeting/:code" element={<MeetingRoom />} />
      <Route path="/meeting/:code/summary" element={<MeetingSummary />} />
    </Routes>
  );
}
