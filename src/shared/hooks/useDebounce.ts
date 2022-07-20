import React from "react";

export const useDebounce = (delay = 300, withoutDelayInFirstTime = true) => {
  const isFirstTime = React.useRef(withoutDelayInFirstTime);
  const debouncing = React.useRef<any>();

  const debounce = React.useCallback(
    (func: () => void) => {
      if (isFirstTime.current) {
        isFirstTime.current = false;
        func();

        return;
      }

      if (debouncing.current) {
        clearTimeout(debouncing.current);
      }

      debouncing.current = setTimeout(() => func(), delay);
    },
    [delay]
  );

  return { debounce };
};
