import { useCallback } from 'react';
import debounce from 'lodash.debounce';

const useDebounce = (callback: any, delay: number = 300) => {
  const debouncedCallback = useCallback(debounce(callback, delay), [delay]);
  return debouncedCallback;
}

export default useDebounce;
