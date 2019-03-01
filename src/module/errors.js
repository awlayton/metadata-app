import {CerebralError} from 'cerebral';

export class GetLocationError extends CerebralError {
    constructor(message) {
        super(message);
        this.name = 'GetLocationError';
    }
}

export class GAPIError extends CerebralError {
    constructor({error}) {
        super(error.message);
        this.name = 'GAPIError';
        this.result = error;
    }
}
