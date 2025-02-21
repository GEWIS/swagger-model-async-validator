const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;
beforeEach(() => {
    validator = new Validator();
});
describe('validationTests', () => {
    test('hasOneOfWhenNotRightTest', async () => {
        var data = {
            messageType: "Test",
            message: {
                client_id: true
            }
        };
        var models = {
            dataModel: {
                "openapi": "3.0.0",
                "info": {
                    "title": "example-service",
                    "description": "example swagger file to show problem",
                    "version": "3.0.0"
                },
                "servers": [
                    {
                        "url": "/api/v1"
                    }
                ],
                "paths": {
                    "/some/endpoint": {
                        "post": {
                            "summary": "validate and then do some stuff",
                            "requestBody": {
                                "content": {
                                    "application/json": {
                                        "schema": {
                                            "$ref": "#/components/schemas/exampleSchema"
                                        }
                                    }
                                }
                            },
                            "responses": {
                                "200": {
                                    "description": "success",
                                },
                                "400": {
                                    "description": "Data error",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "type": "object"
                                            }
                                        }
                                    }
                                },
                                "500": {
                                    "description": "Internal server error"
                                }
                            }
                        }
                    }
                },
                "components": {
                    "schemas": {
                        "exampleSchema": {
                            "description": "Request payload",
                            "required": ["messageType", "message"],
                            "properties": {
                                "messageType": {
                                    "type": "string",
                                    "description": "Type of request to api",
                                    "example": "someMessageType"
                                },
                                "message": {
                                    "type": "object",
                                    "required": ["client_id"],
                                    "properties": {
                                        "client_id": {
                                            "oneOf": [
                                                { "type": "string" },
                                                { "type": "integer" }
                                            ],
                                            "example": "b67d156a-21d3-4267-a7f8-f488c5e34bf8"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        var errors = await validator.validate(data, models["dataModel"].components.schemas.exampleSchema, models["dataModel"]);
        expect(errors.valid).toBeFalsy();
    });
    test('hasOneOfWhenRightTest', async () => {
        var data = {
            messageType: "Test",
            message: {
                client_id: "22"
            }
        };
        var models = {
            dataModel: {
                "openapi": "3.0.0",
                "info": {
                    "title": "example-service",
                    "description": "example swagger file to show problem",
                    "version": "3.0.0"
                },
                "servers": [
                    {
                        "url": "/api/v1"
                    }
                ],
                "paths": {
                    "/some/endpoint": {
                        "post": {
                            "summary": "validate and then do some stuff",
                            "requestBody": {
                                "content": {
                                    "application/json": {
                                        "schema": {
                                            "$ref": "#/components/schemas/exampleSchema"
                                        }
                                    }
                                }
                            },
                            "responses": {
                                "200": {
                                    "description": "success",
                                },
                                "400": {
                                    "description": "Data error",
                                    "content": {
                                        "application/json": {
                                            "schema": {
                                                "type": "object"
                                            }
                                        }
                                    }
                                },
                                "500": {
                                    "description": "Internal server error"
                                }
                            }
                        }
                    }
                },
                "components": {
                    "schemas": {
                        "exampleSchema": {
                            "description": "Request payload",
                            "required": ["messageType", "message"],
                            "properties": {
                                "messageType": {
                                    "type": "string",
                                    "description": "Type of request to api",
                                    "example": "someMessageType"
                                },
                                "message": {
                                    "type": "object",
                                    "required": ["client_id"],
                                    "properties": {
                                        "client_id": {
                                            "oneOf": [
                                                { "type": "string" },
                                                { "type": "integer" }
                                            ],
                                            "example": "b67d156a-21d3-4267-a7f8-f488c5e34bf8"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
        var errors = await validator.validate(data, models["dataModel"].components.schemas.exampleSchema, models["dataModel"]);
        expect(errors.valid).toBeTruthy();
    });
    test('hasOneOfReferenceWhenRightTest', async () => {
        var data = {
            messageType: "Test",
            message: {
                client_id: {
                    id: 90,
                    property2: "asdf"
                }
            }
        };
        var models = {
            dataModel: {
                openapi: "3.0.0",
                info: {
                    title: "example-service",
                    description: "example swagger file to show problem",
                    version: "3.0.0"
                },
                servers: [
                    {
                        url: "/api/v1"
                    }
                ],
                paths: {
                    "/some/endpoint": {
                        post: {
                            summary: "validate and then do some stuff",
                            requestBody: {
                                content: {
                                    "application/json": {
                                        schema: {
                                            $ref: "#/components/schemas/exampleSchema"
                                        }
                                    }
                                }
                            },
                            responses: {
                                "200": {
                                    description: "success"
                                },
                                "400": {
                                    description: "Data error",
                                    content: {
                                        "application/json": {
                                            schema: {
                                                type: "object"
                                            }
                                        }
                                    }
                                },
                                "500": {
                                    description: "Internal server error"
                                }
                            }
                        }
                    }
                },
                components: {
                    schemas: {
                        exampleSchema: {
                            description: "Request payload",
                            required: ["messageType", "message"],
                            properties: {
                                messageType: {
                                    type: "string",
                                    description: "Type of request to api",
                                    example: "someMessageType"
                                },
                                message: {
                                    type: "object",
                                    required: ["client_id"],
                                    properties: {
                                        client_id: {
                                            oneOf: [
                                                {
                                                    $ref: "#/definitions/clientnumber"
                                                },
                                                {
                                                    $ref: "#/definitions/clientobject"
                                                }
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            clientnumber: {
                description: "Client Id Number",
                type: "number"
            },
            clientobject: {
                description: "Client Id Object",
                type: "object",
                properties: {
                    id: {
                        type: "number"
                    },
                    property2: {
                        type: "string"
                    }
                }
            }
        };
        var errors = await validator.validate(
            data,
            models["dataModel"].components.schemas.exampleSchema,
            models
        );
        expect(errors.valid).toBeTruthy();
    });
});
