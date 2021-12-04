class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}
module.exports = CustomError;

// пробовал по разному использовать кастомную ошибку.
// все равно всегда тип ошибки возвращается Cast Error
// пока не разобрался как использовать свой кастомный класс ошибок
