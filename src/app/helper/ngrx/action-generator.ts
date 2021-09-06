import { action, fsa } from 'ts-action';

export function ActionGenerator<TRequest = void,
  TResult = void,
  TError = void,
  TRequestMeta = void,
  TResultMeta = void,
  TErrorMeta = void,
  >(prefix: string, name: string) {
  return {
    request: action(`[${prefix}] ${name} [REQUEST]`, fsa<TRequest, TRequestMeta>()),
    result: action(`[${prefix}] ${name} [RESULT]`, fsa<TResult, TResultMeta>()),
    error: action(`[${prefix}] ${name} [ERROR]`, fsa<TError, TErrorMeta>())
  }
}
