export class NotFoundError extends Error {
  readonly name = "NotFoundError";

  constructor(message = "Resource not found") {
    super(message);
  }
}
