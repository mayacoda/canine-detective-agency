export function assert<T>(condition: T, msg?: string): asserts condition {
  if (!condition) {
    throw new Error(`[AssertionError]: ` + msg)
  }
}
