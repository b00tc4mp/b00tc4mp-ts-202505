export class SystemError extends Error {
    constructor(message) {
        super(message);
    }
}
export class ValidationError extends Error {
    constructor(message) {
        super(message);
    }
}
export class DuplicityError extends Error {
    constructor(message) {
        super(message);
    }
}
export class CredentialsError extends Error {
    constructor(message) {
        super(message);
    }
}
export class NotFoundError extends Error {
    constructor(message) {
        super(message);
    }
}
const errors = {
    SystemError,
    ValidationError,
    DuplicityError,
    CredentialsError,
    NotFoundError,
};
export default errors;
//# sourceMappingURL=errors.js.map