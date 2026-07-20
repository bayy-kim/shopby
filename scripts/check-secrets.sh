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
  MATCHES=$(git diff --cached -U0 -- "$STAGED" 2>/dev/null | grep -E "$PATTERN" || true)
  if [ -n "$MATCHES" ]; then
    echo "${RED}⛔ BLOCKED: $DESCRIPTION${NC}"
    echo "$MATCHES" | sed 's/^/    /'
    FAILED=1
  fi
}

# 1. Live PostgreSQL connection strings (user:password@host, not <placeholder>)
leak_check 'postgresql://[^<][^:]*:[^@]+@' "Live database connection string detected (user:password@)"

# 2. Session secrets that look random/real (hex ≥ 32 chars)
leak_check 'SESSION_SECRET=[0-9a-f]{32,}' "Real-looking session secret detected"

# 3. Known leaked hash value (previous .env.example contamination)
leak_check 'ROutpODD0n4AzloJtFWQKA' "Known leaked ADMIN_PASSWORD_HASH detected"

# 4. Generic private key markers
leak_check '-----BEGIN (RSA |EC )?PRIVATE KEY-----' "Private key detected"

# 5. GitHub personal access tokens
leak_check 'ghp_[0-9a-zA-Z]{36}' "GitHub personal access token detected"

# 6. Slack tokens
leak_check 'xox[baprs]-[0-9a-zA-Z\-]+' "Slack API token detected"

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
