import { simpleGroupBy } from './group-by';
import { AssertNonNull } from '../assert/not-null';

describe('group-by', () => {
  it('should return undefined when one of the inputs is not defined', () => {
    expect(simpleGroupBy(undefined as any, undefined as never)).toEqual(undefined);
    expect(simpleGroupBy(null as any, undefined as never)).toEqual(undefined);

    expect(simpleGroupBy(undefined as any, null as never)).toEqual(undefined);
    expect(simpleGroupBy(null as any, null as never)).toEqual(undefined);
  });

  it('should group every item to its specific key-group', () => {
    interface SimpleItem {
      someKey: string;
    }

    const itemCount = 10;
    const items: SimpleItem[] = new Array(itemCount)
      .fill(undefined)
      .map((_, index) => ({ someKey: `${index % 2}` }));

    const group = simpleGroupBy(items, 'someKey');
    AssertNonNull(group);

    const keys = [...group.keys()];

    expect(keys.length).toEqual(2);

    expect(keys[0]).toEqual('0');
    expect(keys[1]).toEqual('1');

    expect(group.get('0')?.length).toEqual(itemCount / 2);
    expect(group.get('1')?.length).toEqual(itemCount / 2);
  })
})
