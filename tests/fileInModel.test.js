const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;
beforeEach(() => {
    validator = new Validator();
});
describe('validatorTests', () => {
    test('includeFileParameter', async () => {
        const model = {
            id: "TestModel",
            type: "object",
            properties: {
                foo: {
                    type: "object",
                    required: ["event", "data"],
                    properties: {
                        event: {
                            type: "string",
                            description: "name"
                        },
                        data: {
                            type: "object",
                            required: ["email"],
                            properties: {
                                email: {
                                    type: "string",
                                    description: "email address"
                                },
                                description: {
                                    type: "string",
                                    description: "description"
                                }
                            }
                        }
                    }
                }
            }
        };
        const data = {
            foo: {
                event: "test",
                data: {
                    email: "a@b.com"
                }
            }
        };
        const swagger = {
            definitions: {
                TestModel: model
            }
        };
        const testValidator = new Validator(swagger);

        const result = await swagger.validateModel("TestModel", data);
        expect(result.valid).toBe(true);
    });
});
