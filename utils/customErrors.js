class EntryDataError extends Error {
  constructor(message) {
    super(message);
    this.name = "EntryDataError";
    this.statusCode = 400;
  }
}

class UserNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "UserNotFoundError";
    this.statusCode = 404;
  }
}

module.exports = {
  EntryDataError,
  UserNotFoundError
}
