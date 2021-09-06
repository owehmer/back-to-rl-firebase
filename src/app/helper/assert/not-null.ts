export function NonNull<T>(input?: T, customError?: string): asserts input is NonNullable<T> {
  if (input == null) {
    throw new Error(customError ?? 'Das Objekt ist null!');
  }
}
