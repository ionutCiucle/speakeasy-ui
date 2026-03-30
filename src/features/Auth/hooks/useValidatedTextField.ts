import { useState, useCallback } from 'react';

export function useValidatedTextField(label: string) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onChange = useCallback(
    (text: string) => {
      setValue(text);
      if (error) {
        setError(null);
      }
    },
    [error],
  );

  const validate = useCallback((): boolean => {
    if (!value.trim()) {
      setError(`${label} is required`);
      return false;
    }
    setError(null);
    return true;
  }, [value, label]);

  return { value, onChange, error, validate };
}
