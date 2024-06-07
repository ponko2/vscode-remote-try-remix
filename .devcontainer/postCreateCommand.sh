#!/usr/bin/env bash

set -euo pipefail

git config --global --add safe.directory /workspaces/vscode-remote-try-remix

npm uninstall -g pnpm
sudo corepack enable pnpm
corepack install --global pnpm
pnpm config set store-dir ~/.local/share/pnpm/store

cp .env{.example,}
pnpm install --force
pnpm exec prisma migrate dev
