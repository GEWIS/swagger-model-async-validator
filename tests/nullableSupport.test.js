/**
 * Created by bdunn on 26/10/2016.
 */
const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;
beforeEach(() => {
    validator = new Validator();
});
describe('validationTests', () => {
    test('allowXNullableRequiredPropertiesToBeNull', async () => {
        const data = {
            id: 1,
            count: null
        };
        const model = {
            required: ['id', 'count'],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id'
                },
                count: {
                    type: 'number',
                    description: 'A number',
                    'x-nullable': true
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('allowXNullableFalseRequiredProperties', async () => {
        const data = {
            id: 1,
            count: null
        };
        const model = {
            required: ['id', 'count'],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id'
                },
                count: {
                    type: 'number',
                    description: 'A number',
                    'x-nullable': false
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
    });
    test('allowNullableRequiredPropertiesToBeNull', async () => {
        const data = {
            id: 1,
            count: null
        };
        const model = {
            required: ['id', 'count'],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id'
                },
                count: {
                    type: 'number',
                    description: 'A number',
                    nullable: true
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('allowNullableFalseRequiredProperties', async () => {
        const data = {
            id: 1,
            count: null
        };
        const model = {
            required: ['id', 'count'],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id'
                },
                count: {
                    type: 'number',
                    description: 'A number',
                    nullable: false
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
    });
    test('doNotAllowXNullableRequiredPropertiesToBeMissing', async () => {
        const data = {
            id: 1
        };
        const model = {
            required: ['id', 'count'],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id'
                },
                count: {
                    type: 'number',
                    description: 'A number',
                    'x-nullable': true
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
    });
    test('doNotAllowXNullableRequiredPropertiesToBeBlank', async () => {
        const data = {
            id: 1,
            count: ''
        };
        const model = {
            required: ['id', 'count'],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id'
                },
                count: {
                    type: 'number',
                    description: 'A number',
                    'x-nullable': true
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
    });
    test('doNotAllowNullableRequiredPropertiesToBeNull', async () => {
        const data = {
            id: 1,
            count: null
        };
        const model = {
            required: ['id', 'count'],
            properties: {
                id: {
                    type: 'number',
                    description: 'The object id'
                },
                count: {
                    type: 'number',
                    description: 'A number',
                    'x-nullable': false
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
    });
    test('doNotAllowNullableRequiredPropertiesToBeNull2', async () => {
        const data = {
            id: 1,
            count: null
        };
        const model = {
            required: ['id', 'count'],
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
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBe(false);
    });
    test('Issue81DefinitionTest', async () => {
        const data = {
            name: 'zzz',
            some: null
        };
        const model = {
            "type": "object",
            "required": [
                "name"
            ],
            "properties": {
                "name": {
                    "type": "string"
                },
                "some": {
                    "$ref": "#/definitions/Something",
                    "nullable": true
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBe(true);
    });
    test('Issue106DefinitionTest', async () => {
        const data = {
            name: "zzz",
            some: null
        };
        const swagger = {
            definitions: {
                Something: {
                    type: "string"
                },
                Data: {
                    type: "object",
                    required: [
                        "name",
                    ],
                    properties: {
                        name: {
                            type: "string",
                        },
                        some: {
                            $ref: "#/definitions/Something",
                        },
                    },
                },
            },
        };
        const Validator = require("../lib/modelValidator.js");
        const validator = new Validator(swagger);
        const result = await swagger.validateModel("Data", data);
        expect(result.valid).toBe(true);
    });
    test('Issue106Definition2Test', async () => {
        const data = {
            name: "zzz",
        };
        const swagger = {
            definitions: {
                Something: {
                    type: "string"
                },
                Data: {
                    type: "object",
                    required: [
                        "name",
                    ],
                    properties: {
                        name: {
                            type: "string",
                        },
                        some: {
                            $ref: "#/definitions/Something",
                        },
                    },
                },
            },
        };
        const Validator = require("../lib/modelValidator.js");
        const validator = new Validator(swagger);
        const result = await swagger.validateModel("Data", data);
        expect(result.valid).toBe(true);
    });
});
