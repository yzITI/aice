export const base64url = buffer => btoa(String.fromCharCode(...new Uint8Array(buffer))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')

export function random (l) {
  const a = new Uint8Array(l)
  window.crypto.getRandomValues(a)
  return base64url(a)
}
