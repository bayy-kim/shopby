#!/bin/sh
# Install git hooks for this repo.
# Run from repo root:  sh scripts/install-hooks.sh

HOOK_SRC="scripts/check-secrets.sh"
HOOK_DST=".git/hooks/pre-commit"

if [ ! -d ".git" ]; then
  echo "❌ Not a git repository. Run from repo root."
  exit 1
fi

if [ ! -f "$HOOK_SRC" ]; then
  echo "❌ Source hook not found: $HOOK_SRC"
  exit 1
fi

cp "$HOOK_SRC" "$HOOK_DST"
chmod +x "$HOOK_DST"

echo "✅ Pre-commit hook installed at $HOOK_DST"
echo "   Akan blocking commit kalau ada credential asli di staged files."
