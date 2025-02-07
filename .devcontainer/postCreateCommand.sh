#!/usr/bin/env bash

set -euo pipefail

git config --global --add safe.directory /workspaces/vscode-remote-try-remix

npm uninstall -g pnpm
wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
export PNPM_HOME="$HOME/.local/share/pnpm"
export PATH="$PNPM_HOME:$PATH"
pnpm config set store-dir "$HOME/.local/share/pnpm/store"

cp .env{.example,}
pnpm install --force
pnpm exec prisma migrate dev
