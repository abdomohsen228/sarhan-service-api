export interface JwtPayload {
  email: string;
  id: number;
  tokenVersion: number;
  iat: number;
  exp: number;
}
