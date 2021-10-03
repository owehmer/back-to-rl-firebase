import firebase from 'firebase/compat';

export function isFirebaseError(input?: any): input is firebase.FirebaseError {
  if (input == null) {
    return false;
  }
  if (!(input instanceof Error)) {
    return false;
  }

  return input.name === 'FirebaseError';
}
