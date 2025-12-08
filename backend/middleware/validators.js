const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};

const validateRegister = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('cpassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  handleValidationErrors,
];

const validateSignIn = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors,
];

const validateFamilyTree = [
  body('familyName')
    .trim()
    .notEmpty()
    .withMessage('Family name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Family name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  body('globalNodes')
    .isArray()
    .withMessage('Global nodes must be an array'),
  body('globalEdges')
    .isArray()
    .withMessage('Global edges must be an array'),
  handleValidationErrors,
];

const validateViewFamilyTree = [
  body('familyName')
    .trim()
    .notEmpty()
    .withMessage('Family name is required'),
  handleValidationErrors,
];

const validateGetFamilyList = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors,
];

module.exports = {
  validateRegister,
  validateSignIn,
  validateFamilyTree,
  validateViewFamilyTree,
  validateGetFamilyList,
  handleValidationErrors,
};

