/**
 * Simple GroupBy that groups items by a specific key
 * @param list
 * @param key
 */
export function simpleGroupBy<TItem, TItemKey extends keyof TItem>(list: readonly TItem[], key: TItemKey) {
  const group = new Map<TItem[TItemKey], TItem[]>();

  if (!list || !key) {
    return undefined;
  }

  for (const input of list) {
    const inputKeyValue = input[key];
    const groupEntries = group.has(inputKeyValue)
      ? group.get(inputKeyValue) ?? []
      : [];

    groupEntries.push(input);
    group.set(inputKeyValue, groupEntries);
  }
  return group;
}
