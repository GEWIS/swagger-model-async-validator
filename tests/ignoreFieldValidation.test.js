const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;
beforeEach(() => {
    validator = new Validator();
});

describe('validatorTests', () => {
    test('invalidFieldValidation', async () => {
        expect.assertions(2);
        const model = {
            id: "testModel",
            properties: {
                id: {
                    type: "integer"
                }
            }
        };
        const data = {
            id: 'Hello'
        };
        const result = await validator.validate(data, model);
        expect(result.valid).toBe(false);
        expect(result.errorCount).toBe(1);
    });
    test('invalidFieldValidationDoNotValidate', async () => {
        expect.assertions(1);
        const model = {
            id: "testModel",
            properties: {
                id: {
                    type: "integer",
                    'x-do-not-validate': true
                }
            }
        };
        const data = {
            id: 'Hello'
        };
        const result = await validator.validate(data, model);
        expect(result.valid).toBe(true);
    });
});
