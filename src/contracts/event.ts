import { Timestamp } from './firestore';

export type RlEventStatusType = 'OPEN' | 'CLOSED';

export const enum RlEventStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED'
}

export interface RlEvent {
  id: string;
  name: string;
  startTime: Timestamp;
  endTime: Timestamp;
  organizerId: string; // FK -> User
  priority: number;
  isPrivate: boolean;
  status: RlEventStatus | RlEventStatusType;
  attendingUser: string[];
  maxAttendingUser: number;
  details: RlEventDetail[];
}

export interface RlEventDetail {
  eventId: string;
  name: string;
  pictureUrl: string;
}
