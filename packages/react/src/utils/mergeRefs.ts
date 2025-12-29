import type { MutableRefObject, RefCallback, Ref } from 'react';

type PossibleRef<T> = Ref<T> | undefined;

/**
 * Merge multiple refs into one
 */
export function mergeRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
  return (value: T) => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref && typeof ref === 'object') {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
}
