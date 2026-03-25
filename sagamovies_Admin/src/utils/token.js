export function extractToken(payload) {
  if (!payload || typeof payload !== 'object') {
    return '';
  }

  return (
    payload.token ||
    payload.jwt ||
    payload.accessToken ||
    payload.data?.token ||
    payload.data?.jwt ||
    ''
  );
}
