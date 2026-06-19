# AGENTS.md — Gmeet Clone

## Stack
- Frontend: React + TypeScript + Vite + LiveKit SDK
- Backend: Node.js + Express + TypeScript
- Media: LiveKit SFU (self-hosted)
- DB: PostgreSQL + Redis
- Infra: Docker Compose

## Conventions
- Conventional commits: feat:, fix:, refactor:, chore:
- One component per file (src/components/)
- Pages in src/pages/ — routes match file names
- Backend routes in src/routes/ — one file per resource

## Setup
1. `cd infra && docker compose up -d`
2. `cd backend && npm install && npm run dev`
3. `cd frontend && npm install && npm run dev`

## LiveKit
- Config in infra/livekit.yaml
- Default keys: devkey / devsecret
- Ports: 7880 (HTTP), 7881 (WS), 50000-60000 (UDP media)
