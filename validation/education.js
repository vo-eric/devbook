const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.field = !isEmpty(data.field) ? data.field : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "School is required";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree is required";
  }

  if (Validator.isEmpty(data.field)) {
    errors.field = "Field is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "Start date is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
