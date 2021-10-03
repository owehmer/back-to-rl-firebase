export function AssertNonNull<T>(input?: T, customError?: string): asserts input is NonNullable<T> {
  if (input == null) {
    throw new Error(customError ?? 'The object is null!');
  }
}
