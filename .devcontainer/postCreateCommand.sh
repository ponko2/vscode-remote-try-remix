#!/usr/bin/env bash

set -euo pipefail

git config --global --add safe.directory /workspaces/vscode-remote-try-remix

cp .env{.example,}
pnpm install --force
pnpm exec prisma migrate dev
