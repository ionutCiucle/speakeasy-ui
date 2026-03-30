import { useState, useCallback } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useValidatedEmailField() {
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
      setError('Email is required');
      return false;
    }
    if (!EMAIL_REGEX.test(value)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError(null);
    return true;
  }, [value]);

  return [value, onChange, error, validate] as const;
}
