const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;
beforeEach(() => {
    validator = new Validator();
});

describe('validationTests', () => {
    test('matchesPatternTest', async() => {
        var data = {
            "patternType":{"restrictedField": "ABC"}
        };

        var models = {
            "MyType": {
                "type": "object",
                "properties": {
                    "patternType": {
                        "$ref": "#\/definitions\/PatternType"
                    }
                }
            },
            "PatternType": {
                "type": "object",
                "properties": {
                    "restrictedField": {
                        "type": "string",
                        "pattern": "[A-Z]{3}"
                    }
                }
            }
        };

        var errors = await validator.validate(data, models["MyType"], models);

        expect(errors.valid).toBe(true);
    });
    test('doesNotMatchPatternTest', async () => {
        var data = {
            "patternType":{"restrictedField": "abc"}
        };

        var models = {
            "MyType": {
                "type": "object",
                "properties": {
                    "patternType": {
                        "$ref": "#\/definitions\/PatternType"
                    }
                }
            },
            "PatternType": {
                "type": "object",
                "properties": {
                    "restrictedField": {
                        "type": "string",
                        "pattern": "[A-Z]{3}"
                    }
                }
            }
        };

        var errors = await validator.validate(data, models["MyType"], models);

        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toEqual('restrictedField does not match the pattern [A-Z]{3}')
    });
    test('doesNotMatchSwaggerFieldNameRestrictions', async () => {
        var data = {
            "patternType":{"restrictedField": "AB!"}
        };

        var models = {
            "MyType": {
                "type": "object",
                "properties": {
                    "patternType": {
                        "$ref": "#\/definitions\/PatternType"
                    }
                }
            },
            "PatternType": {
                "type": "object",
                "properties": {
                    "restrictedField": {
                        "type": "string",
                        "pattern": "^[a-zA-Z0-9\.\-_]+$"
                    }
                }
            }
        };

        var errors = await validator.validate(data, models["MyType"], models);

        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toEqual('restrictedField does not match the pattern ^[a-zA-Z0-9\.\-_]+$');
    });
    test('doesNotMatchPatternLength', async () => {
        var data = {
            "patternType":{"restrictedField": "AB"}
        };

        var models = {
            "MyType": {
                "type": "object",
                "properties": {
                    "patternType": {
                        "$ref": "#\/definitions\/PatternType"
                    }
                }
            },
            "PatternType": {
                "type": "object",
                "properties": {
                    "restrictedField": {
                        "type": "string",
                        "pattern": "^[A-Z]{3,3}$"
                    }
                }
            }
        };

        var errors = await validator.validate(data, models["MyType"], models);

        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toEqual('restrictedField does not match the pattern ^[A-Z]{3,3}$');
    });
    test('patternTestGauravve', async () => {
        var models = {
            "user": {
                "title": "User",
                "type": "object",
                "additionalProperties": false,
                "properties": {
                    "pNumber": {
                        "type": "string",
                        "minLength": 3,
                        "maxLength": 30,
                        "pattern": "[A-Za-z0-9-]*"
                    },
                    "org": {
                        "type": "string",
                        "minLength": 3,
                        "maxLength": 30,
                        "pattern": "[A-Za-z0-9-]"
                    },
                    "enabled": {
                        "type": "boolean"
                    },
                    "userRoles": {
                        "type": "array",
                        "uniqueItems": true,
                        "minItems": 1,
                        "maxItems": 7,
                        "items": {
                            "type": "string",
                            "enum": [
                                "admin",
                                "consumer"
                            ]
                        }
                    }
                },
                "required": [
                    "pNumber",
                    "org"
                ],
            }
        };

        var data =   {
            "pNumber": "p!@#$!@#",
            "org": "!@#$!@#$",
            "enabled": true,
            "userRoles": [
                "admin",
                "consumer"
            ]
        };

        var errors = await validator.validate(data, models["user"], models);

        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toEqual('org does not match the pattern [A-Za-z0-9-]');
    });
    test('patternTestGauravve2', async () => {
        var models = {
            "user": {
                "title": "User",
                "type": "object",
                "additionalProperties": false,
                "properties": {
                    "pNumber": {
                        "type": "string",
                        "minLength": 3,
                        "maxLength": 30,
                        "pattern": "[A-Za-z0-9-]*"
                    },
                    "org": {
                        "type": "string",
                        "minLength": 3,
                        "maxLength": 30,
                        "pattern": "[A-Za-z0-9-]"
                    },
                    "enabled": {
                        "type": "boolean"
                    },
                    "userRoles": {
                        "type": "array",
                        "uniqueItems": true,
                        "minItems": 1,
                        "maxItems": 7,
                        "items": {
                            "type": "string",
                            "enum": [
                                "admin",
                                "consumer"
                            ]
                        }
                    }
                },
                "required": [
                    "pNumber",
                    "org"
                ],
            }
        };

        var data =   {
            "pNumber": "p!@#$!@#",
            "org": "Actual99",
            "enabled": true,
            "userRoles": [
                "admin",
                "consumer"
            ]
        };

        var errors = await validator.validate(data, models["user"], models);
        expect(errors.valid).toBe(true);
    });
    test('doesNotMatchPattern2', async () => {
        var data = {
            "patternType": { "restrictedField": "W3" }
        };

        var models = {
            "MyType": {
                "type": "object",
                "properties": {
                    "patternType": {
                        "type": "object",
                        "properties": {
                            "restrictedField": {
                                "type": "string",
                                "pattern": "^[A-Z]{2}"
                            }
                        }
                    }
                }
            }
        };

        var errors = await validator.validate(data, models["MyType"], models);
        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toEqual('restrictedField does not match the pattern ^[A-Z]{2}');
    });
    test('patternTestWithinOneOf', async () => {
        var data = {
            contactMechanism: {
                line1: '300 E Main St',
                city: 'Madison',
                stateCode: 'WI',
                zip5: '537805'
            },
            name: {
                first: 'John',
                last: 'Smith'
            }
        };

        var models = {
            AddressType: {
                type: 'object',
                properties: {
                    line1: {
                        type: 'string'
                    },
                    line2: {
                        type: 'string'
                    },
                    city: {
                        type: 'string'
                    },
                    stateCode: {
                        type: 'string',
                        pattern: '^([A-Z]{2})$'
                    },
                    zip5: {
                        type: 'string',
                        pattern: '^([0-9]{5})$'
                    }
                },
                required: ['line1', 'city', 'stateCode', 'zip5']
            },
            ContactMechanisms: {
                oneOf: [
                    {$ref: '#/components/schemas/AddressType'},
                    {$ref: '#/components/schemas/PhoneType'}
                ]
            },
            Person: {
                type: 'object',
                properties: {
                    contactMechanism: {
                        $ref: '#/components/schemas/ContactMechanisms'
                    },
                    name: {
                        $ref: '#/components/schemas/Name'
                    }
                },
                required: ['contactMechanism', 'name']
            },
            Name: {
                type: 'object',
                properties: {
                    first: {type: 'string', description: "First name, e.g. 'John'"},
                    last: {type: 'string', description: "Last name, e.g. 'Smith'"}
                },
                required: ['first', 'last']
            },
            PhoneType: {
                type: 'object',
                properties: {
                    number: {
                        type: 'string',
                        format: 'phone'
                    }
                },
                required: ['number']
            }
        };

        var errors = await validator.validate(data, models["Person"], models, false, true);
        expect(errors.valid).toBe(false);
        var errorExists = false;
        for (var error of errors.errors) {
            if (error.message) {
                errorExists = error.message.includes(
                    "contactMechanism is not a valid target for a oneOf"
                );
            }
        }
        expect(errorExists).toBe(true);
    });
});
