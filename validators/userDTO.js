// validators/userValidator.js
const { body, param, validationResult } = require('express-validator');

const validateUser = [
  body('username')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name is required'),
  body('email')
    .isEmail()
    .withMessage('Email must be valid')
    .notEmpty()
    .withMessage('Email is required'),
  body('createdAt')
    .optional()
    .isISO8601()
    .withMessage('createdAt must be a valid date'),
  body('updatedAt')
    .optional()
    .isISO8601()
    .withMessage('updatedAt must be a valid date'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateUserId = [
  param('id').isInt().withMessage('ID must be an integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateUser,
  validateUserId
};
