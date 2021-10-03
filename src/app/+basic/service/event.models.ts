import { RlEvent, RlEventStatus } from '../../../contracts/event';

export const eventStatusToPrioMap: Record<RlEventStatus, number> = {
  OPEN: 1,
  CLOSED: 2
}

export interface EventGroup {
  key: RlEventStatus,
  events: RlEvent[]
}
