const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;

beforeEach(() => {
    validator = new Validator();
});

describe('Validation Tests', () => {
    test('arrayTypeIgnored', async () => {
        const data = {
            sample: ["test", "face", "tribble"]
        };
        const model = {
            required: [],
            properties: {
                sample: {
                    type: 'array',
                    items: {
                        type: "string"
                    }
                }
            }
        };

        const errors = await validator.validate(data, model);

        expect(errors.valid).toBe(true);
    });

    test('arrayNotDefined', async () => {
        const data = {
            sample: ["test", "face", "tribble"]
        };
        const model = {
            required: [],
            properties: {
                name: {
                    type: "string"
                }
            }
        };

        const errors = await validator.validate(data, model);

        expect(errors.valid).toBe(true);
    });

    test('arrayNullWhenNullable', async () => {
        const data = {
            sample: null
        };
        const model = {
            required: ['sample'],
            properties: {
                sample: {
                    type: 'array',
                    items: {
                        type: "string"
                    },
                    "x-nullable": true
                }
            }
        };

        const errors = await validator.validate(data, model);

        expect(errors.valid).toBe(true);
    });

    test('arrayNullWhenNullable2', async () => {
        const data = {
            sample: null
        };
        const model = {
            required: ['sample'],
            properties: {
                sample: {
                    type: 'array',
                    items: {
                        type: "string"
                    },
                    "nullable": true
                }
            }
        };

        const errors = await validator.validate(data, model);

        expect(errors.valid).toBe(true);
    });

    test('arrayNullWhenNotNullable', async () => {
        const data = {
            sample: null
        };
        const model = {
            required: ['sample'],
            properties: {
                sample: {
                    type: 'array',
                    items: {
                        type: "string"
                    }
                }
            }
        };

        const errors = await validator.validate(data, model);

        expect(errors.valid).toBe(false);
        expect(errors.errors.length).toBe(1);
        expect(errors.errors[0].message).toBe('sample is a required field');
    });

    test('arrayTypeRequired', async () => {
        const data = {
            sample: ["test", "face", "tribble"]
        };
        const model = {
            required: ['sample'],
            properties: {
                sample: {
                    type: 'array',
                    items: {
                        type: "string"
                    }
                }
            }
        };

        const errors = await validator.validate(data, model);

        expect(errors.valid).toBe(true);
    });

    test('missingArrayTypeRequired', async () => {
        const data = {
            name: ["test", "face", "tribble"]
        };
        const model = {
            required: ['sample'],
            properties: {
                sample: {
                    type: 'array',
                    items: {
                        type: "string"
                    }
                }
            }
        };

        const errors = await validator.validate(data, model);

        expect(errors.valid).toBe(false);
        expect(errors.errors.length).toBe(1);
        expect(errors.errors[0].message).toBe('sample is a required field');
    });

    test('emptyArrayValidates', async () => {
        const data = {
            sample: []
        };
        const model = {
            required: [],
            properties: {
                sample: {
                    type: 'array',
                    items: {
                        type: "string"
                    }
                }
            }
        };

        const errors = await validator.validate(data, model);

        expect(errors.valid).toBe(true);
    });

    test('arrayValidationFails', async() => {
        const data = {
            sample: [1, "2", "tribble"]
        };
        const model = {
            required: ['sample'],
            properties: {
                sample: {
                    type: 'array',
                    items: {
                        type: "integer"
                    }
                }
            }
        };

        const errors = await validator.validate(data, model);

        expect(errors.valid).toBe(false);
    });

    test('arrayRefValidationFails', async () => {
        const data = {
            sample: [{ id: 1, name: 'test' }, "2", "tribble"]
        };
        const models = {
            model: {
                required: ['sample'],
                properties: {
                    sample: {
                        type: 'array',
                        items: {
                            $ref: "refModel"
                        }
                    }
                }
            },
            refModel: {
                required: ['id'],
                properties: {
                    id: {
                        type: "integer"
                    },
                    name: {
                        type: "string"
                    }
                }
            }
        };

        const errors = await validator.validate(data, models["model"], models);

        expect(errors.valid).toBe(false);
    });

    test('arrayTypeIsNotArrayRequired', async () => {
        const data = {
            sample: "Test;Hello;Factor"
        };
        const model = {
            required: ['sample'],
            properties: {
                sample: {
                    type: 'array',
                    items: {
                        type: "string"
                    }
                }
            }
        };

        const errors = await validator.validate(data, model);

        expect(errors.valid).toBe(false);
        expect(errors.errors.length).toBe(1);
        expect(errors.errors[0].message).toBe("sample is not an array. An array is expected.");
    });

    test('arrayTypeIsNull', async () => {
        const data = {
            sample: null
        };
        const model = {
            required: ['sample'],
            properties: {
                sample: {
                    type: 'array',
                    items: {
                        type: "string"
                    }
                }
            }
        };

        const errors = await validator.validate(data, model);

        expect(errors.valid).toBe(false);
        expect(errors.errors.length).toBe(1);
        expect(errors.errors[0].message).toBe('sample is a required field');
    });

    test('arrayTypeIsOnOf', async () => {
        const data = {
            lines: [
                {
                    productId: 'myProductId'
                },
                {
                    name: 'myProductName'
                }
            ]
        };
        const models = {
            datamodel: {
                "type": "object",
                "properties": {
                    "lines": {
                        "type": "array",
                        "minItems": 1,
                        "items": {
                            "oneOf": [
                                {
                                    "$ref": "#/definitions/line-name"
                                },
                                {
                                    "$ref": "#/definitions/line-productId"
                                }
                            ]
                        }
                    }
                }
            },
            "line-name": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    }
                }
            },
            "line-productId": {
                "type": "object",
                "properties": {
                    "productId": {
                        "type": "string"
                    }
                }
            }
        };

        const errors = await validator.validate(data, models.datamodel, models);
        expect(errors.valid).toBe(true);
    });

    test('arrayTypeIsOnOfFails', async() => {
        const data = {
            lines: [
                {
                    productid: 'myProductId'
                },
                {
                    name: 1
                }
            ]
        };
        const models = {
            datamodel: {
                "type": "object",
                "properties": {
                    "lines": {
                        "type": "array",
                        "minItems": 1,
                        "items": {
                            "oneOf": [
                                {
                                    "$ref": "#/definitions/line-name"
                                },
                                {
                                    "$ref": "#/definitions/line-productId"
                                }
                            ]
                        }
                    }
                }
            },
            "line-name": {
                "type": "object",
                "required": ["name"],
                "properties": {
                    "name": {
                        "type": "string"
                    }
                }
            },
            "line-productId": {
                "type": "object",
                "required": ["productId"],
                "properties": {
                    "productId": {
                        "type": "string"
                    }
                }
            }
        };

        const errors = await validator.validate(data, models.datamodel, models);

        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toBe("Item 0 in Array (lines) contains an object that is not one of the possible types");
    });

    test('arrayUniqueItemNoRef', async () => {
        const data = {
            sample: ["test", "test", "tribble"]
        };
        const model = {
            required: ['sample'],
            properties: {
                sample: {
                    type: 'array',
                    uniqueItems: true,
                    items: {
                        type: "string"
                    }
                }
            }
        };

        const errors = await validator.validate(data, model);

        expect(errors.valid).toBe(false);
        expect(errors.errors.length).toBe(1);
        expect(errors.errors[0] instanceof Error).toBe(true);
        expect(errors.errors[0].message).toBe('Item test is duplicated in sample');
    });

    test('arrayUniqueItemWithRef', async() => {
        const data = {
            sample: [{ id: 1, name: 'test' }, { id: 1, name: 'test' }]
        };
        const models = {
            model: {
                required: ['sample'],
                properties: {
                    sample: {
                        type: 'array',
                        uniqueItems: true,
                        items: {
                            $ref: "refModel"
                        }
                    }
                }
            },
            refModel: {
                required: ['id'],
                properties: {
                    id: {
                        type: "integer"
                    },
                    name: {
                        type: "string"
                    }
                }
            }
        };

        const errors = await validator.validate(data, models["model"], models);

        expect(errors.valid).toBe(false);
        expect(errors.errors.length).toBe(1);
        expect(errors.errors[0] instanceof Error).toBe(true);
        expect(errors.errors[0].message).toBe('Item sample contains duplicated fields');
    });
});
