# Gmeet Clone

A full-stack Google Meet clone built on **LiveKit SFU** — real-time video conferencing with screen sharing, chat, host controls, and more.

Built for learning, portfolio, and because owning your video infra is satisfying.

## Architecture

```
┌──────────────────────────────────────────┐
│           React + TypeScript UI          │
│  Landing → Pre-Join → Meeting → Summary  │
└──────────────────┬───────────────────────┘
                   │ LiveKit SDK (WebRTC)
┌──────────────────▼───────────────────────┐
│           LiveKit SFU (Go)               │
│  Media routing · Room state · Auth (JWT) │
│  Egress (recording) · Agents (AI)        │
└──────────┬───────────────────────────────┘
           │
┌──────────▼───────────────────────────────┐
│        Backend API (Node.js)             │
│  Room CRUD · JWT issuance · Validation   │
│  PostgreSQL · Redis                      │
└──────────────────────────────────────────┘
```

## Project Structure

```
gmeet-clone/
├── frontend/          # React + TypeScript (Vite)
│   ├── pages/         # Landing, PreJoin, MeetingRoom, Summary
│   ├── components/    # VideoGrid, BottomDock, ChatPanel, etc.
│   ├── hooks/         # useLiveKit, custom React hooks
│   └── lib/           # LiveKit client config, utilities
├── backend/           # Node.js API server
│   ├── routes/        # REST endpoints
│   ├── services/      # Business logic
│   ├── middleware/     # CORS, rate limiting, error handling
│   └── db/            # Schema, migrations
├── infra/             # Infrastructure
│   ├── docker-compose.yml   # LiveKit SFU + Redis + Postgres
│   ├── livekit.yaml         # LiveKit server config
│   └── Caddyfile            # Reverse proxy with auto-TLS
├── docs/              # Specs, architecture, guides
└── specs/             # Spec-driven development artifacts
```

## Quick Start

### Prerequisites

- Node.js 20+
- Docker + Docker Compose
- LiveKit CLI (optional, for testing)

### 1. Start Infrastructure

```bash
cd infra
docker compose up -d
```

This starts LiveKit SFU, Redis, and PostgreSQL.

### 2. Start Backend

```bash
cd backend
cp .env.example .env      # configure your LiveKit API key/secret
npm install
npm run dev
```

### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` — you're in a meeting.

## Features

| Priority | Feature | Status |
|----------|---------|--------|
| P0 | Landing / Lobby | 🟡 Planned |
| P0 | Pre-join screen | 🟡 Planned |
| P0 | Multi-party video/audio | 🟡 Planned |
| P0 | Room creation & join codes | 🟡 Planned |
| P0 | Screen sharing | 🟡 Planned |
| P0 | Mute/camera controls | 🟡 Planned |
| P0 | Participant grid + active speaker | 🟡 Planned |
| P0 | Participant list | 🟡 Planned |
| P0 | Meeting timer + connection status | 🟡 Planned |
| P0 | In-meeting room layout | 🟡 Planned |
| P1 | In-meeting chat | 🔴 Backlog |
| P1 | Host controls | 🔴 Backlog |
| P1 | Raise hand | 🔴 Backlog |
| P1 | Meeting end / summary screen | 🔴 Backlog |
| P2 | Recording | 🔴 Backlog |
| P2 | Virtual backgrounds | 🔴 Backlog |
| P3 | AI transcript + summary | 🔴 Backlog |

## Tracking

Work is tracked in Jira (SCRUM project) with full Given/When/Then specs in `docs/gmeet-clone-specs.md`.

## License

MIT
