const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;

beforeEach(() => {
    validator = new Validator();
});

describe('validationTests', () => {

    test('trueBooleanType', async () => {
        const data = {
            sample: true
        };
        const model = {
            required: [],
            properties: {
                sample: {
                    type: 'boolean'
                }
            }
        };

        const errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });

    test('falseBooleanType', async () => {
        const data = {
            sample: false
        };
        const model = {
            required: [],
            properties: {
                sample: {
                    type: 'boolean'
                }
            }
        };

        const errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });

    test('invalidBooleanTypeString', async () => {
        const data = {
            sample: 'false'
        };
        const model = {
            required: [],
            properties: {
                sample: {
                    type: 'boolean'
                }
            }
        };

        const errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
    });

    test('invalidBooleanTypeInteger', async () => {
        const data = {
            sample: 0
        };
        const model = {
            required: [],
            properties: {
                sample: {
                    type: 'boolean'
                }
            }
        };

        const errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
    });

    test('invalidBooleanTypeInteger4', async () => {
        const data = {
            sample: 4
        };
        const model = {
            required: [],
            properties: {
                sample: {
                    type: 'boolean'
                }
            }
        };

        const errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
    });

});
