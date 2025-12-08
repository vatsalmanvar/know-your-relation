export const handleAPIError = (error, setError) => {
  if (error && error.message) {
    setError(error.message);
  } else {
    setError('An unexpected error occurred. Please try again.');
  }
};

export const displayError = (error) => {
  if (typeof error === 'string') {
    return error;
  }
  if (error?.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

