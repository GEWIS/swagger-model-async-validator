const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;
beforeEach(() => {
    validator = new Validator();
});
describe('validatorTests', () => {
    test('allowExtraProperties', async () => {
        const data = {
            id: 1,
            count: 4
        };
        const model = {
            required: ['id'],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id'
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('disallowExtraProperties', async () => {
        const data = {
            id: 1,
            count: 4
        };
        const model = {
            required: ['id'],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id'
                }
            }
        };
        const errors = await validator.validate(data, model, null, false, true);
        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toBe("Target property 'count' is not in the model");
    });
    test('disallowExtraPropertiesWithN0oExtraProperties', async () => {
        const data = {
            id: 1,
            count: 4
        };
        const model = {
            required: ['id'],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id'
                },
                count: {
                    type: 'number',
                    description: 'A number'
                }
            }
        };
        const errors = await validator.validate(data, model, null, false, true);
        expect(errors.valid).toBe(true);
    });
    test('disallowNestedExtraProperties', async () => {
        const person = {
            id: 1,
            names: {
                firstName: "Bob",
                lastName: "Roberts",
                middleName: "Shouldn't be here"
            }
        };
        const model = {
            required: ['id'],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id'
                },
                names: {
                    type: 'object',
                    properties: {
                        firstName: {
                            type: "string",
                            description: "First Name"
                        },
                        lastName: {
                            type: "string",
                            description: "Last Name"
                        }
                    }
                }
            }
        };
        const errors = await validator.validate(person, model, null, false, true);
        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toBe("Target property 'middleName' is not in the model");
    });
    test('disallowReferencedExtraProperties', async () => {
        const person = {
            id: 1,
            names: {
                firstName: "Bob",
                lastName: "Roberts",
                middleName: "Shouldn't be here"
            }
        };
        const namesModel = {
            type: 'object',
            properties: {
                firstName: {
                    type: "string",
                    description: "First Name"
                },
                lastName: {
                    type: "string",
                    description: "Last Name"
                }
            }
        };
        const personModel = {
            required: ['id'],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id'
                },
                names: {
                    "$ref": "#/definitions/names"
                }
            }
        };
        const models = {
            definitions: {
                names: namesModel,
                person: personModel
            }
        };
        const errors = await validator.validate(person, models.definitions.person, models.definitions, false, true);
        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toBe("Target property 'middleName' is not in the model");
    });
});
