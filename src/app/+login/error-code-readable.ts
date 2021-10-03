export function errorCodeToReadableString(errorCode: string | undefined) {
  switch (errorCode) {
    case 'auth/wrong-password': {
      return 'Username or password is wrong';
    }
    case 'auth/invalid-email': {
      return 'Email is badly formatted';
    }
    case 'auth/user-not-found': {
      return 'User was not found';
    }
  }
  return 'Unknown error';
}
