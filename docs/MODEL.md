# grokmem model

Fork of TeamAssist's EventStore + CycleJS shell.
Beliefs live on entity streams. Sittings live on chat streams. The index is the always-on catalog.

## Streams

| Stream | Loaded | Write rule |
|---|---|---|
| `rules` | every session | constitution only |
| `users` / profile (`user-drew`) | every session | stable facts, gated |
| `index` | every session | one slim row per included chat |
| `chats` | current chat; others if summoned | structured patches, never full dumps |
| `projects` | if index or query names them | HEAD beliefs, dual-written from include |

## Chat lifecycle

`draft` (working tree) → explicit **include** → `indexed` → optional `sealed`

Include / flush writes:
1. episode commit on `chats`
2. index row upsert
3. optional patch on named `projects` and profile

## Recall pack

Always: rules HEAD + user HEAD + live index + current chat since last flush.
Summoned: matching project HEAD + diffs from 1–2 indexed chats.

## Seed entities when we resume

- `user-drew`
- `project-teamassist`
- `project-memory`
- `memory-rules`
