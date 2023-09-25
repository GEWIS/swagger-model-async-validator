const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;
beforeEach(() => {
    validator = new Validator();
});
describe('validationTests', () => {
    test('invalidIntegerTypeTest', async () => {
        var data = {
            id: 'sample'
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toBe('id (sample) is not a type of integer');
    });
    test('integerAsStringTypeTest', async () => {
        var data = {
            id: '123'
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toBe('id (123) is not a type of integer');
    });
    test('invalidIntegerBlankTest', async () => {
        var data = {
            id: ""
        };
        var model = {
            required: [],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toBe('id ({empty string}) is not a type of integer');
    });
    test('invalidIntegerBlankWhenRequiredTest', async () => {
        var data = {
            id: ""
        };
        var model = {
            required: ['id'],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toBe('id is a required field');
    });
    test('validIntegerTypeTest', async () => {
        var data = {
            id: 1
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('validPrimitiveIntegerTypeTest', async () => {
        var data = 1;
        var model = {
            type: 'integer',
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('validInteger32TypeTest', async () => {
        var data = {
            id: 1
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int32'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('validInteger32TypeFailedTest', async () => {
        var data = {
            id: 3000000000
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int32'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
    });
    test('validInteger64TypeTest', async () => {
        var data = {
            id: 3000000000
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int64'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('testdecimalcalcFails', async () => {
        var v1 = 3.41111111;
        var v2 = 1.22222222;
        var result = v1 + v2;
        expect(result).not.toBe(4.63333333);
    });
    test('invalidIntegerDecimalValueTest', async () => {
        var data = {
            id: 100.52
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toBe('id (100.52) is not a type of integer');
    });
    test('invalidInteger32DecimalValueTest', async () => {
        var data = {
            id: 100.52
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int32'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toBe('id (100.52) is not a type of int32');
    });
    test('invalidInteger64DecimalValueTest', async () => {
        var data = {
            id: 100.52
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int64'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toBe('id (100.52) is not a type of int64');
    });
    test('validIntegerDecimalValueTest', async () => {
        var data = {
            id: 100.00
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('validInteger32DecimalValueTest', async () => {
        var data = {
            id: 100.00
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int32'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('validInteger32DecimalValueTest', async () => {
        var data = {
            id: 100.00
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int64'
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('validIntegerMinimumExceededTest', async () => {
        var data = {
            id: 300
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int32',
                    minimum: 2400
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
    });
    test('validIntegerMinimumTest', async () => {
        var data = {
            id: 300
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int32',
                    minimum: 300
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('validIntegerMinimumIsZeroTest', async () => {
        var data = {
            id: 1
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int32',
                    minimum: 0
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('invalidIntegerMinimumIsZeroTest', async () => {
        var data = {
            id: -1
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int32',
                    minimum: 0
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
    });
    test('validIntegerMaxiumumExceededTest', async () => {
        var data = {
            id: 300
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int32',
                    maximum: 24
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
    });
    test('validIntegerMaxiumumTest', async () => {
        var data = {
            id: 300
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int32',
                    maximum: 300
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('invalidIntegerMaxiumumIsZeroTest', async () => {
        var data = {
            id: 300
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int32',
                    maximum: 0
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
    });
    test('validIntegerMaxiumumIsZeroTest', async () => {
        var data = {
            id: -5
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int32',
                    maximum: 0
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('validIntegerMinimumExclusiveExceededTest', async () => {
        var data = {
            id: 300
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int32',
                    exclusiveMinimum: 300
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
    });
    test('validIntegerMaximumExclusiveExceededTest', async () => {
        var data = {
            id: 300
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int32',
                    exclusiveMaximum: 300
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
    });
    test('validIntegerMinimumExclusiveTest', async () => {
        var data = {
            id: 301
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int32',
                    exclusiveMinimum: 300
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('validIntegerMaximumExclusiveTest', async () => {
        var data = {
            id: 299
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int32',
                    exclusiveMaximum: 300
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('validIntegerMinimumExclusiveTest', async () => {
        var data = {
            id: 301
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int32',
                    exclusiveMinimum: 300
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    })
    test('validIntegerMaximumExclusiveTest', async () => {
        var data = {
            id: 299
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int32',
                    exclusiveMaximum: 300
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    })
    test('validIntegerMaximumExclusiveTest', async () => {
        var data = {
            id: 100
        };
        var model = {
            required: [ 'id' ],
            properties: {
                id: {
                    type: 'integer',
                    description: 'The object id',
                    format: 'int32',
                    exclusiveMinimum: -100,
                    exclusiveMaximum: 300
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    })
});
