import {CerebralError} from 'cerebral';

export class GetLocationError extends CerebralError {
    constructor(message) {
        super(message);
        this.name = 'GetLocationError';
    }
}

export class GAPIError extends CerebralError {
    constructor(err) {
        // gapi doesn't always throw the same sorts of things..
        let error = err;
        if (err.result && error.result.error) {
            error = err.result.error;
        }

        super(error.message);
        this.name = 'GAPIError';
        this.result = error;
    }
}

export class SerializeError extends CerebralError {
    constructor(r, c, err) {
        super(`Error serializing column "${c}" of row ${r}: ${err.message}`);
        this.name = 'DeserializeError';
        this.err = err;
    }
}

export class DeserializeError extends CerebralError {
    constructor(r, c, err) {
        super(`Error deserializing column "${c}" of row ${r}: ${err.message}`);
        this.name = 'DeserializeError';
        this.err = err;
    }
}
