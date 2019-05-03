import isEmpty from 'lodash.isempty';

// Function to decide if value constitutes an answered question
export default function unanswered(value) {
    if (typeof value === 'object') {
        return isEmpty(value) || (value.every && value.every(isEmpty));
    } else {
        return value === undefined || value === '';
    }
}
