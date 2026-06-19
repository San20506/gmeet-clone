import { useParams, useNavigate } from 'react-router-dom';

export default function MeetingSummary() {
  const { code } = useParams();
  const navigate = useNavigate();

  return (
    <div className="summary">
      <h2>Meeting ended</h2>
      <p>Room: {code}</p>
      <button onClick={() => navigate('/')}>Return to Home</button>
      <button onClick={() => navigator.clipboard.writeText(window.location.href)}>
        Copy meeting link
      </button>
    </div>
  );
}
