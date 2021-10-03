import { simpleGroupBy } from '../../helper/array/group-by';
import { AssertNonNull } from '../../helper/assert/not-null';
import { EventGroup, eventStatusToPrioMap } from './event.models';
import { RlEvent, RlEventStatus } from '../../../contracts/event';

export function getNextStatusClient(event: RlEvent): RlEventStatus {
  switch (event.status) {
    case RlEventStatus.OPEN:
      return RlEventStatus.CLOSED;
    case RlEventStatus.CLOSED:
      return RlEventStatus.OPEN;
  }
  throw new Error('Unknown status: ' + status);
}

/**
 * Return grouped events. the groups are sorted by their priority
 * @param events
 */
export function groupEventsByStatus(events: RlEvent[] | undefined | null) {
  if (!events) {
    return undefined;
  }

  const group = simpleGroupBy(events, 'status');
  AssertNonNull(group);

  return [...group.keys()]
    .sort((g1, g2) => eventStatusToPrioMap[g1] - eventStatusToPrioMap[g2])
    .map(key => ({
      key,
      events: group.get(key)
    } as EventGroup));
}
