#!/usr/bin/env bash

set -euo pipefail

git config --global --add safe.directory /workspaces/vscode-remote-try-remix

pnpm install --force
pnpm exec prisma migrate dev
