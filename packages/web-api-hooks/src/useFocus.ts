import { useState } from 'react';

/**
 * Tracks focus state of an element.
 *
 * @returns Whether the element has focus, and props to be spread over the element under observation.
 *
 * @example
 * function Component() {
 *   const [isFocused, bindFocus] = useFocus();
 *   // ...
 *   return <ElementToObserve {...bindFocus} />;
 * }
 */
export default function useFocus(): [
  boolean,
  Readonly<{
    onFocus: () => void;
    onBlur: () => void;
  }>,
] {
  const [isFocused, setFocused] = useState(false);

  return [
    isFocused,
    {
      onFocus(): void {
        setFocused(true);
      },
      onBlur(): void {
        setFocused(false);
      },
    },
  ];
}
