const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;
beforeEach(() => {
    validator = new Validator();
});

describe('validationTests', () => {
    test('validateEnum', async () => {
        const data = {
            sample: 'test'
        };
        const model = {
            required: [],
            properties: {
                sample: {
                    type: 'string',
                    enum: [
                        'test',
                        'mix'
                    ]
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('validateNotEnum', async () => {
        const data = {
            sample: 'token'
        };
        const model = {
            required: [],
            properties: {
                sample: {
                    type: 'string',
                    enum: [
                        'test',
                        'mix'
                    ]
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toBe('sample must be one of the following: test, mix');
    });
    test('validateEnumEmpty', async () => {
        const data = {
            travis: 'test'
        };
        const model = {
            required: [],
            properties: {
                sample: {
                    type: 'string',
                    enum: [
                        'test',
                        'mix'
                    ]
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
});
