#!/usr/bin/env bash

set -euo pipefail

nix profile add nixpkgs#nix-direnv
mkdir -p ~/.config/direnv
echo "source ~/.nix-profile/share/nix-direnv/direnvrc" >> ~/.config/direnv/direnvrc

nix develop --command pnpm exec prisma migrate dev

direnv allow
