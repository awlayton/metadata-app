import {CerebralError} from 'cerebral';

export class GetLocationError extends CerebralError {
    constructor(message) {
        super(message);
        this.name = 'GetLocationError';
    }
}
