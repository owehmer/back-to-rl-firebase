import { Timestamp } from './firestore';

export interface RlUser {
  id: string;
  username: string;
  surname: string;
  lastname: string;
  birthdate: Timestamp;
}
