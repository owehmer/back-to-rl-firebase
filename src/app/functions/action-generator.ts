import { action, fsa } from 'ts-action';

export function ActionGenerator<TRequest,
  TResult,
  TError,
  TRequestMeta,
  TResultMeta,
  TErrorMeta,
  >(prefix: string, name: string) {
  return {
    request: action(`[${prefix}] ${name} [REQUEST]`, fsa<TRequest, TRequestMeta>()),
    result: action(`[${prefix}] ${name} [REQUEST]`, fsa<TResult, TResultMeta>()),
    error: action(`[${prefix}] ${name} [REQUEST]`, fsa<TError, TErrorMeta>())
  }
}
