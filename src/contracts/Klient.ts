import { Timestamp } from './firestore';

export interface IKlient {
  id: string;
  vorname: string;
  name: string;
  geburtsdatum: Timestamp;
}
