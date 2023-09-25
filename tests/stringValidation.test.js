const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;
beforeEach(() => {
    validator = new Validator();
});
describe('validationTests', () => {
    test('invalidStringTypeTest', async () => {
        var data = {
            id: 1
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'string',
                    description: 'The object id'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toBe('id (1) is not a type of string');
    });
    test('invalidEmailFormatTest', async () => {
        var data = {
            id: "This is a string but not an email"
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'string',
                    format: 'email',
                    description: 'The object id'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toBe('id (This is a string but not an email) is not a type of email');
    });
    test('validEmailFormatTest', async () => {
        var data = {
            id: "test@test.com"
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'string',
                    format: 'email',
                    description: 'An email'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('allowArbitraryFormat', async () => {
        var data = {
            id: 'valid string here'
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'string',
                    format: 'this-can-be-anything',
                    description: 'The object id'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('stringBlankTest', async () => {
        var data = {
            id: ""
        };
        var model = {
            required: [],
            properties: {
                id: {
                    type: 'string',
                    description: 'The object id'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('stringBlankWhenRequiredTest', async () => {
        var data = {
            id: ""
        };
        var model = {
            required: ['id'],
            properties: {
                id: {
                    type: 'string',
                    description: 'The object id'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('validStringTypeTest', async () => {
        var data = {
            sample: 'Helpful Text sample'
        };
        var model = {
            required: [],
            properties: {
                sample: {
                    type: 'string'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('lengthOkTest', async () => {
        var data = {
            sample: 'TestData'
        };
        var model = {
            properties: {
                sample: {
                    type: 'string',
                    minLength: 4,
                    maxLength: 12
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('lengthShortTest', async () => {
        var data = {
            sample: 'Me'
        };
        var model = {
            properties: {
                sample: {
                    type: 'string',
                    minLength: 4,
                    maxLength: 12
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toBe('sample must be at least 4 characters long and no more than 12 characters long');
    });
    test('lengthLongTest', async () => {
        var data = {
            sample: 'ThisTestDataIsTooLong'
        };
        var model = {
            properties: {
                sample: {
                    type: 'string',
                    minLength: 4,
                    maxLength: 12
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toBe('sample must be at least 4 characters long and no more than 12 characters long');
    });
    test('validateTypeOfUndefinedPropertyTest', async () => {
        var data = {
            sample: true
        };
        var model = {
            required: [],
            properties: {
                sample: {
                    type: 'boolean'
                },
                truffle: {
                    type: 'boolean'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('validateStringMinLengthFailsTest', async () => {
        var data = {
            sample: true,
            tag: ""
        };
        var model = {
            required: [],
            properties: {
                sample: {
                    type: 'boolean'
                },
                truffle: {
                    type: 'boolean'
                },
                tag: {
                    type: "string",
                    minLength: 1
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toBe('tag cannot be blank');
    });
    test('validateStringMaxLengthFailsTest', async () => {
        var data = {
            sample: true,
            tag: "12"
        };
        var model = {
            required: [],
            properties: {
                sample: {
                    type: 'boolean'
                },
                truffle: {
                    type: 'boolean'
                },
                tag: {
                    type: "string",
                    maxLength: 1
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
        //expect(false).toBe(errors.errors);
    });
});
