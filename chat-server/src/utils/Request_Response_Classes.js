class AppError extends Error {
  constructor(status, message, description, errorMsg = '') {
    super(message);
    this.status = status >= 400 && status < 500 ? 'fail' : 'error';
    this.description = description;
    this.error = errorMsg;

    Error.captureStackTrace(this, this.constructor);
  }
}

class AppResonse {
  constructor(status, message, description, errorMsg = '', data = {}) {
    this.status = status;
    this.message = message;
    this.description = description;
    this.error = errorMsg;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }
}

export { AppError, AppResonse };
