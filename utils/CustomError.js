class CustomError extends Error {
  constructor(code, message) {
    super();
    this.code = code || 500;
    this.message = message;
    this.name = this.constructor.name;
  }
}
module.exports = { CustomError };
