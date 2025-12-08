export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  return null;
};

export const validateFamilyName = (familyName) => {
  if (!familyName || familyName.trim().length === 0) {
    return 'Family name is required';
  }
  if (familyName.trim().length < 2) {
    return 'Family name must be at least 2 characters long';
  }
  if (familyName.trim().length > 100) {
    return 'Family name must be less than 100 characters';
  }
  return null;
};

