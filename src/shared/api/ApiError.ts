export class ApiError extends Error {
  public readonly statusCode?: number
  public readonly originalError?: unknown

  constructor(message: string, statusCode?: number, originalError?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.originalError = originalError
  }
}