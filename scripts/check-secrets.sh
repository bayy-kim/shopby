#!/bin/sh
# Pre-commit hook: block commits containing live credentials
#
# Patterns checked in staged files:
#   - postgresql://user:password@ (real credentials, not placeholders)
#   - Known leaked values from .env.example history
#   - Generic private key markers
#
# Exit 1 (block commit) if any pattern matches staged diff.

RED='\033[0;31m'
NC='\033[0m' # No Color

STAGED=$(git diff --cached --name-only --diff-filter=ACMR)

if [ -z "$STAGED" ]; then
  exit 0
fi

echo "🔍 Checking staged files for leaked credentials..."

FAILED=0

leak_check() {
  PATTERN=$1
  DESCRIPTION=$2
  MATCHES=$(git diff --cached -U0 -- "$STAGED" 2>/dev/null | grep -c -E -- "$PATTERN" 2>/dev/null || true)
  if [ "$MATCHES" -gt 0 ] 2>/dev/null; then
    echo "${RED}⛔ BLOCKED: $DESCRIPTION${NC}"
    echo "${RED}   File yang bermasalah:${NC}"
    git diff --cached --name-only -G "$PATTERN" 2>/dev/null | sed 's/^/    /'
    FAILED=1
  fi
}

# 1. Live PostgreSQL connection strings (user:password@host, not <placeholder>)
leak_check 'postgresql://[^<][^:]*:[^@]+@' "Live database connection string detected (user:password@)"

# 2. Known leaked hash value (previous .env.example contamination)
leak_check 'ROutpODD0n4AzloJtFWQKA' "Known leaked ADMIN_PASSWORD_HASH detected"

# 3. Generic private key markers
leak_check 'BEGIN PRIVATE KEY' "Private key detected"

# 4. GitHub personal access tokens
leak_check 'ghp_[0-9a-zA-Z]+' "GitHub personal access token detected"

if [ "$FAILED" -ne 0 ]; then
  echo ""
  echo "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo "${RED}🚫 COMMIT BLOCKED — credential(s) found in staged changes${NC}"
  echo "${RED}   Hapus credential asli dari file sebelum commit.${NC}"
  echo "${RED}   Gunakan placeholder environment variable sebagai gantinya.${NC}"
  echo "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  exit 1
fi

echo "✅ No secrets detected."
exit 0
