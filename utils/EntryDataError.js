const {CustomError} = require("./CustomError");

// const customError = new CustomError();

class EntryDataError extends CustomError {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 404;
  }
}

module.exports = {
  EntryDataError,
};
