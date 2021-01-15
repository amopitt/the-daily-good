export class UnauthorizedError extends Error {
  constructor(message: string, public readonly status = 401) {
    super(message);
  }
}
