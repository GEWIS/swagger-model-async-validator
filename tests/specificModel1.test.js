const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;
beforeEach(() => {
    validator = new Validator();
});
describe('userIssue2', () => {
    test('testSampleOk', async () => {
        var model = {
            id: "TestModel",
            type: "object",
            required: [ "foo" ],
            properties: {
                foo: {
                    type: "object",
                    required: [ "event", "data" ],
                    properties: {
                        event: {
                            type: "string",
                            description: "name"
                        },
                        data: {
                            type: "object",
                            required: [ "email" ],
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
        var data = {
            foo: {
                event: "test",
                data: {
                    email: "a@b.com"
                }
            }
        };
        var swagger = {
            definitions: {
                TestModel: model
            }
        };
        var result = await validator.validate(data, model, swagger.definitions);
        expect(result.valid).toBe(true);
    });
    test('testNoIdWithErrorGetsModelNameRight', async () => {
        var model = {
            type: "object",
            required: [ "foo" ],
            properties: {
                foo: {
                    type: "object",
                    required: [ "event", "data" ],
                    properties: {
                        event: {
                            type: "string",
                            description: "name"
                        },
                        data: {
                            type: "object",
                            required: [ "email" ],
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
        var data = {
            foo: {
                event: "test",
                data: {
                    emailAddress: "a@b.com"
                }
            }
        };
        var swagger = {
            definitions: {
                TestModel: model
            }
        };
        var testValidator = new Validator(swagger);

        var result = await swagger.validateModel("TestModel", data);
        expect(result.valid).toBe(false);
        expect(result.modelName).toBe("TestModel");
    });
    test('testNoIdOk', async () => {
        var model = {
            id: "TestModel2",
            type: "object",
            required: [ "foo" ],
            properties: {
                foo: {
                    type: "object",
                    required: [ "event", "data" ],
                    properties: {
                        event: {
                            type: "string",
                            description: "name"
                        },
                        data: {
                            type: "object",
                            required: [ "email" ],
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
        var data = {
            foo: {
                event: "test",
                data: {
                    emailAddress: "a@b.com"
                }
            }
        };
        var swagger = {
            definitions: {
                TestModel: model
            }
        };
        var result = await validator.validate(data, model, swagger.definitions);
        expect(result.valid).toBe(false);
        expect(result.modelName).toBe("TestModel2");
    });
});
