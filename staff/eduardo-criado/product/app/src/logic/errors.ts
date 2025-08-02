export class SystemError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class DuplicityError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class CredentialsError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}

const errors = {
  SystemError: typeof SystemError,
  ValidationError: typeof ValidationError,
  DuplicityError: typeof DuplicityError,
  CredentialsError: typeof CredentialsError,
  NotFoundError: typeof NotFoundError,
};

export default errors;
