import { SortByStatusPipe } from './sort-by-status.pipe';
import { RlEvent } from '../../../contracts/event';

describe('SortByStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new SortByStatusPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return an empty array if input is null or undefined', () => {
    const pipe = new SortByStatusPipe();
    expect(pipe.transform(undefined)).toEqual([]);
    expect(pipe.transform(null)).toEqual([]);
  });

  it('sorts by status first and prio second', () => {
    const events: Partial<RlEvent>[] = [
      {
        id: '1',
        status: 'OPEN',
        priority: 5
      },
      {
        id: '2',
        status: 'CLOSED',
        priority: 1
      },
      {
        id: '3',
        status: 'OPEN',
        priority: 1
      }
    ];

    const sortedEvents = new SortByStatusPipe().transform(events as RlEvent[]);

    expect(sortedEvents[0].id).toEqual('3');
    expect(sortedEvents[1].id).toEqual('1');
    expect(sortedEvents[2].id).toEqual('2');
  })
});
