import { useReducer } from 'react';

type JSONProperty = string | number | boolean | JSONArray | JSONObject | null;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface JSONArray extends Array<JSONProperty> {}

interface JSONObject {
  [key: string]: JSONProperty;
}

/**
 * Stores a key/value pair statefully.
 *
 * @param key Identifier to associate the stored value with.
 * @param initialValue Value used when no item exists with the given key. Lazy initialization is available by using a function which returns the desired value.
 * @param storage Storage object, which stays intact through page loads.
 * @param errorCallback Method to execute in case of an error, e.g. when the storage quota has been exceeded.
 * @returns {[V, React.Dispatch<React.SetStateAction<V>>]} A statefully stored value, and a function to update it.
 *
 * @example
 * const Example = () => {
 *   const [name, setName] = useStorage('name', 'Anonymous');
 *   // ...
 * };
 *
 * @see [`useState` hook](https://reactjs.org/docs/hooks-reference.html#usestate), which exposes a similar interface
 */
export default function useStorage<I>(
  key: string,
  initialValue?: I | (() => I),
  storage = localStorage,
  errorCallback?: (error: DOMException) => void,
) {
  type V = Extract<I, JSONProperty>;

  return useReducer(
    (prevValue: V, update: React.SetStateAction<V>) => {
      const nextValue =
        typeof update === 'function' ? update(prevValue) : update;

      try {
        storage.setItem(key, JSON.stringify(nextValue));
      } catch (error) {
        if (errorCallback) errorCallback(error);
      }
      return nextValue;
    },

    key,
    initialKey => {
      const serializedValue = storage.getItem(initialKey);

      if (serializedValue != null) {
        try {
          return JSON.parse(serializedValue);
        } catch {
          // Backwards compatibility with past stored non-serialized values
          return serializedValue;
        }
      }

      return typeof initialValue === 'function'
        ? (initialValue as () => V)()
        : initialValue;
    },
  );
}