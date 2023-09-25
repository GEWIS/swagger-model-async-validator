const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;
beforeEach(() => {
    validator = new Validator();
});
describe('validationTests', () => {
    test('stringObjectype', async () => {
        var data = {
            "id": "1",
            "testObject": ""
        };
        var model = {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "description": "ID"
                },
                "testObject": {
                    "type": "object",
                    "properties": {
                        "testObjectProperty": {
                            "type": "string",
                            "description": "testObjectProperty Description"
                        }
                    },
                    "description": "Testing Example"
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBeFalsy();
        expect(errors.errors[0].message).toBe("testObject is not a type of object. It is a type of string");
    });
    test('typeFieldWrongType', async () => {
        var data = {
            "id": "1",
            "testObject": {
                "testObjectProperty": "testObjectString"
            }
        };
        var model = {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "description": "ID"
                },
                "testObject": {
                    // type should be a string, not an object
                    "type": {
                        "type": "object"
                    },
                    "properties": {
                        "testObjectProperty": {
                            "type": "string",
                            "description": "testObjectProperty Description"
                        }
                    },
                    "description": "Testing Example"
                }
            }
        };
        var errors = await validator.validate(data, model);
        expect(errors.valid).toBeFalsy();
        expect(errors.errors[0].message).toBe("Schema property (testObject) has a non string 'type' field");
    });
});
