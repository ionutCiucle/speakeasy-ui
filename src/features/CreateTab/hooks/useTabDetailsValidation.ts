import { useState, useCallback } from 'react';

interface Values {
  tabName: string;
  venue: string;
}

interface ValidationErrors {
  tabName?: string;
  venue?: string;
}

interface UseTabDetailsValidationReturn {
  errors: ValidationErrors;
  validateAll: () => boolean;
}

export function useTabDetailsValidation(
  values: Values,
): UseTabDetailsValidationReturn {
  const [submitted, setSubmitted] = useState(false);

  const errors: ValidationErrors = submitted
    ? {
        tabName:
          values.tabName.trim().length === 0
            ? 'Tab name is required'
            : undefined,
        venue:
          values.venue.trim().length === 0 ? 'Venue is required' : undefined,
      }
    : {};

  const validateAll = useCallback((): boolean => {
    setSubmitted(true);
    return values.tabName.trim().length > 0 && values.venue.trim().length > 0;
  }, [values.tabName, values.venue]);

  return { errors, validateAll };
}
