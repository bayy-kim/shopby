const store = new Map<string, { count: number; resetAt: number }>()

export function rateLimit(
  key: string,
  { max = 5, windowMs = 60_000 }: { max?: number; windowMs?: number } = {}
): { allowed: boolean } {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    store.size > 10_000 && store.clear()
    return { allowed: true }
  }

  if (entry.count >= max) {
    return { allowed: false }
  }

  entry.count++
  return { allowed: true }
}
