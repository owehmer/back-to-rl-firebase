import { simpleArrayMergeUpdate } from './simple-merge';
import { AssertNonNull } from '../assert/not-null';

describe('simpleArrayMergeUpdate', () => {
  interface TestItem {
    id: number;
    someObj: {
      a: Date | undefined
    }
  }

  it('should return undefined when both inputs are null or undefined', () => {
    expect(simpleArrayMergeUpdate(undefined, undefined, (a, b) => a === b)).toBe(undefined);
    expect(simpleArrayMergeUpdate(null, undefined, (a, b) => a === b)).toBe(undefined);
    expect(simpleArrayMergeUpdate(undefined, null, (a, b) => a === b)).toBe(undefined);
    expect(simpleArrayMergeUpdate(null, null, (a, b) => a === b)).toBe(undefined);
  });

  it('updates an item if found without touching the input arrays', () => {
    const srcDate = new Date('2020-05-05');
    const srcArray: TestItem[] = [{
      id: 1,
      someObj: {
        a: srcDate
      }
    }];
    const replacementArray: TestItem[] = [{
      id: 1,
      someObj: {
        a: undefined
      }
    }];

    const mergedArray = simpleArrayMergeUpdate(srcArray, replacementArray, (src, repl) => src.id === repl.id);
    AssertNonNull(mergedArray);

    expect(mergedArray.length).toEqual(1);
    const mergedElem = mergedArray[0];

    AssertNonNull(mergedElem);

    expect(mergedArray.length).toEqual(1);
    expect(mergedElem.id).toEqual(1);
    expect(mergedElem.someObj.a).toEqual(undefined);

    expect(srcArray[0].someObj.a).toEqual(srcDate);
    expect(replacementArray[0].someObj.a).toEqual(undefined);
  });

  it('appends an item to the list if the compareFn doesnt find the item', () => {
    const srcDate = new Date('2020-05-05');
    const srcArray: TestItem[] = [{
      id: 1,
      someObj: {
        a: srcDate
      }
    }];
    const replacementArray: TestItem[] = [{
      id: 2,
      someObj: {
        a: undefined
      }
    }];

    const mergedArray = simpleArrayMergeUpdate(srcArray, replacementArray, (src, repl) => src.id === repl.id);
    AssertNonNull(mergedArray);

    expect(mergedArray.length).toEqual(2);

    expect(mergedArray[0].id).toEqual(1);
    expect(mergedArray[1].id).toEqual(2);

    expect(mergedArray[0].someObj.a).toEqual(srcDate);
    expect(mergedArray[1].someObj.a).toEqual(undefined);
  })
})
