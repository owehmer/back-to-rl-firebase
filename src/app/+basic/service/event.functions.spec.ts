import { getNextStatusClient, groupEventsByStatus } from './event.functions';
import { AssertNonNull } from '../../helper/assert/not-null';
import { RlEvent, RlEventStatus } from '../../../contracts/event';

describe('Event Functions', () => {
  describe('Client', () => {
    test.each`
    status                  | expectedNextStatus          | description
    ${RlEventStatus.OPEN}   | ${RlEventStatus.CLOSED}     | ${'open -> closed'}
    ${RlEventStatus.CLOSED} | ${RlEventStatus.OPEN}       | ${'closed -> open'}
  `('getNextStatus: $description', ({ status, expectedNextStatus }) => {
      const item = {
        status
      } as Partial<RlEvent> as RlEvent;
      expect(getNextStatusClient(item)).toEqual(expectedNextStatus);
    });

    test('getNextStatus throws an error if it cant handle the input status', () => {
      const item = {
        status: 'foo'
      } as unknown as RlEvent;

      expect(() => getNextStatusClient(item)).toThrowError();
    });
  });

  describe('groupEventsByStatus', () => {
    it('should return undefined when null or undefined is provided', () => {
      expect(groupEventsByStatus(undefined)).toEqual(undefined);
      expect(groupEventsByStatus(null)).toEqual(undefined);
    });

    it('should create the correct groups', () => {
      const events: Partial<RlEvent>[] = [
        {
          id: '1',
          status: 'OPEN'
        },
        {
          id: '2',
          status: 'CLOSED'
        },
        {
          id: '3',
          status: 'OPEN'
        }
      ];

      const groups = groupEventsByStatus(events as RlEvent[]);
      expect(groups?.length).toEqual(2);
      AssertNonNull(groups);

      expect(groups[0].key).toEqual('OPEN');
      expect(groups[1].key).toEqual('CLOSED');
    })
  })
})
