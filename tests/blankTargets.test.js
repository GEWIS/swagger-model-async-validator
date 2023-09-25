const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;

beforeEach(() => {
    validator = new Validator();
});

describe('validatorTests', () => {

    test('disallowBlankTargets', async () => {
        const data = {};

        const model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id'
                }
            }
        };

        const errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toBe("Unable to validate an empty value for property: rootModel");
    });

    test('allowBlankTargets', async () => {
        const data = {};

        const model = {
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id'
                }
            }
        };

        const errors = await validator.validate(data, model, null, true);
        expect(errors.valid).toBe(true);
    });

    test('disallowNestedBlankTargets', async () => {
        const person = {
            id: 1,
            names: {}
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

        const errors = await validator.validate(person, model);
        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toBe("Unable to validate an empty value for property: names");
    });

    test('allowNestedBlankTargets', async () => {
        const person = {
            id: 1,
            names: {}
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

        const errors = await validator.validate(person, model, null, true);
        expect(errors.valid).toBe(true);
    });

    test('allowReferencedBlankTargets', async () => {
        const person = {
            id: 1,
            names: {}
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

        const errors = await validator.validate(person, models.definitions.person, models.definitions, true);
        expect(errors.valid).toBe(true);
    });

    test('disallowReferencedBlankTargets', async () => {
        const person = {
            id: 1,
            names: {}
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

        const errors = await validator.validate(person, models.definitions.person, models.definitions, false);
        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toBe("Unable to validate an empty value for property: names");
    });

});
