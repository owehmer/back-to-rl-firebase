/**
 * Compares two arrays with each other.
 * If a matching element is found, the element of the "replacementArray"
 * will replace the element in the source list.
 *
 * Items that are not found in the source list will simply be appended.
 * @param srcArray
 * @param replacementArray
 * @param compareFn
 */
export function simpleArrayMergeUpdate<TArrayType>(
  srcArray: Readonly<TArrayType[]> | undefined | null,
  replacementArray: Readonly<TArrayType[]> | undefined | null,
  compareFn: (srcElem: TArrayType, replacementElem: TArrayType) => boolean
): TArrayType[] | undefined {
  if ((srcArray == null || srcArray.length === 0) && (replacementArray == null || replacementArray.length === 0)) {
    return undefined;
  }

  const replacementArrCopy = [...(replacementArray ?? [])];

  const mergedArr: TArrayType[] = [];

  for (const srcElem of (srcArray ?? [])) {
    const replacedElemIndex = replacementArrCopy.findIndex(rElem => compareFn(srcElem, rElem));
    const replacedElem = replacedElemIndex >= 0
      ? replacementArrCopy.splice(replacedElemIndex, 1)[0]
      : undefined;

    mergedArr.push(replacedElem != null ? replacedElem : srcElem);
  }

  // Append the rest of the elements to the list
  for (const replacementElement of replacementArrCopy) {
    mergedArr.push(replacementElement);
  }

  return mergedArr;
}
