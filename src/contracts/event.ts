import { Timestamp } from './firestore';

export interface RlEvent {
  id: string;
  name: string;
  startTime: Timestamp;
  endTime: Timestamp;
  organizerId: string; // FK -> User
}
