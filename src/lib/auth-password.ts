import { scryptSync, timingSafeEqual } from "crypto"

function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split(":")
  if (parts.length !== 2) return false
  const [salt, key] = parts
  const derivedKey = scryptSync(password, salt, 64)
  const storedKey = Buffer.from(key, "base64")
  if (derivedKey.length !== storedKey.length) return false
  return timingSafeEqual(derivedKey, storedKey)
}

export function validateCredentials(
  email: string,
  password: string
): boolean {
  const adminEmail = process.env.ADMIN_EMAIL
  const adminHash = process.env.ADMIN_PASSWORD_HASH
  if (!adminEmail || !adminHash) return false
  if (email !== adminEmail) return false
  return verifyPassword(password, adminHash)
}
