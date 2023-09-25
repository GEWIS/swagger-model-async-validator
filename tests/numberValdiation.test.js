const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;
beforeEach(() => {
    validator = new Validator();
});
describe('validationTests', () => {
    test('invalidNumberTypeTest', async () => {
        var data = {
            id: 'sample'
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'number',
                    format: 'double',
                    description: 'The object id'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBeFalsy();
        expect(errors.errors[0].message).toBe('id (sample) is not a type of double');
    });
    test('numberAsStringTypeTest', async () => {
        var data = {
            id: '123'
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBeFalsy();
        expect(errors.errors[0].message).toBe('id (123) is not a type of number');
    });
    test('invalidNumberBlankTest', async () => {
        var data = {
            id: ""
        };
        var model = {
            required: [],
            properties: {
                id: {
                    type: 'number',
                    format: "float",
                    description: 'The object id'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBeFalsy();
        expect(errors.errors[0].message).toBe('id ({empty string}) is not a type of float');
    });
    test('invalidNumberBlankWhenRequiredTest', async () => {
        var data = {
            id: ""
        };
        var model = {
            required: ['id'],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBeFalsy();
        expect(errors.errors[0].message).toBe('id is a required field');
    });
    test('validNumberTypeTest', async () => {
        var data = {
            id: 1
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBeTruthy();
    });
    test('validNumberDecimalTypeTest', async () => {
        var data = {
            id: 1.2
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'number',
                    format: 'double',
                    description: 'The object id'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBeTruthy();
    });
    test('validInteger32TypeFailedTest', async () => {
        var data = {
            id: 3000000000
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id',
                    format: 'int32'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBeTruthy();
    });
    test('validFloatTypeTest', async () => {
        var data = {
            id: 3000000000
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id',
                    format: 'float'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBeTruthy();
    });
    test('testdecimalcalcFails', async () => {
        var v1 = 3.41111111;
        var v2 = 1.22222222;
        var result = v1 + v2;
        expect(result).not.toBe(4.63333333);
    });
    test('validIntegerMinimumExceededTest', async () => {
        var data = {
            id: 300
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id',
                    format: 'double',
                    minimum: 2400
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBeFalsy();
    });
    test('validIntegerMinimumTest', async () => {
        var data = {
            id: 300
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id',
                    format: 'float',
                    minimum: 300
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBeTruthy();
    });
    test('validIntegerMaxiumumExceededTest', async () => {
        var data = {
            id: 300
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id',
                    format: 'float',
                    maximum: 24
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBeFalsy();
    });
    test('validIntegerMaxiumumTest', async () => {
        var data = {
            id: 300
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id',
                    format: 'float',
                    maximum: 300
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBeTruthy();
    });
    test('validIntegerMinimumExclusiveExceededTest', async () => {
        var data = {
            id: 300
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id',
                    format: 'float',
                    exclusiveMinimum: 300
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBeFalsy();
    });
    test('validIntegerMaximumExclusiveExceededTest', async () => {
        var data = {
            id: 300
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id',
                    format: 'float',
                    exclusiveMaximum: 300
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBeFalsy();
    });
    test('validDoubleMinimumExclusiveTest', async () => {
        var data = {
            id: 0.00000000001
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id',
                    format: 'double',
                    exclusiveMinimum: 0
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBeTruthy();
    });
    test('validDoubleMinimumExclusiveTestOldSchema', async () => {
        var data = {
            id: 0.00000000001
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id',
                    format: 'double',
                    minimum: 0,
                    exclusiveMinimum: true
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBeTruthy();
    });
    test('invalidDoubleMinimumExclusiveTestOldSchema', async () => {
        var data = {
            id: 0
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id',
                    format: 'double',
                    minimum: 0,
                    exclusiveMinimum: true
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBeFalsy();
    });
    test('validIntegerMaximumExclusiveTest', async () => {
        var data = {
            id: 299.999
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id',
                    format: 'double',
                    exclusiveMaximum: 300
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBeTruthy();
    });
    test('validDoubleMaximumExclusiveTestOldSchema', async () => {
        var data = {
            id: -0.00000000001
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id',
                    format: 'double',
                    maximum: 0,
                    exclusiveMaximum: true
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBeTruthy();
    });
    test('invalidDoubleMaximumExclusiveTestOldSchema', async () => {
        var data = {
            id: 0
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id',
                    format: 'double',
                    maximum: 0,
                    exclusiveMaximum: true
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBeFalsy();
    });
});
