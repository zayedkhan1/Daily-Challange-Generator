import { useState} from "react";

export function useLocalStorage(key, initialValue, expiryMs = 48 * 60 * 60 * 1000) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      const data = JSON.parse(item);
      if (data.expiry && Date.now() > data.expiry) {
        window.localStorage.removeItem(key);
        return initialValue;
      }
      return data.value;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const data = {
        value,
        expiry: Date.now() + expiryMs,
      };
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch {
      // Ignore write errors
    }
  };

  return [storedValue, setValue];
}
