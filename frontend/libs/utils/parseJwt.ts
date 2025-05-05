export function parseJwt(token: string): { sub?: number; [key: string]: any } {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return {};
  }
}
