const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;

beforeEach(() => {
    validator = new Validator();
});

describe('validationTests', () => {
    test('hasRefWithDefinitionPrefixTest', async () => {
        var data = {
            sample: true,
            location: {
                top: 1,
                left: 1,
                right: 5,
                bottom: 5
            },
            type: "dataModel"
        };

        var models = {
            firstModel: {
                discriminator: "type"
            },
            dataModel: {
                required: [ "sample" ],
                properties: {
                    sample: {
                        type: "boolean"
                    },
                    location: {
                        $ref: "#/definitions/Location"
                    }
                }
            },
            Location: {
                required: [ "top", "left" ],
                properties: {
                    top: {
                        type: "integer"
                    },
                    left: {
                        type: "integer"
                    },
                    right: {
                        type: "integer"
                    },
                    bottom: {
                        type: "integer"
                    }
                }
            }
        };

        var swagger = {
            allModels: models
        };

        var errors = await validator.validate(data, "firstModel", swagger);

        expect(errors.valid).toBe(true);
    });

    test('hasRefWithDefinitionPrefixUsingValidateTest', async () => {
        var data = {
            sample: true,
            location: {
                top: 1,
                left: 1,
                right: 5,
                bottom: 5
            },
            type: "dataModel"
        };

        var models = {
            firstModel: {
                discriminator: "type"
            },
            dataModel: {
                required: [ "sample" ],
                properties: {
                    sample: {
                        type: "boolean"
                    },
                    location: {
                        $ref: "#/definitions/Location"
                    }
                }
            },
            Location: {
                required: [ "top", "left" ],
                properties: {
                    top: {
                        type: "integer"
                    },
                    left: {
                        type: "integer"
                    },
                    right: {
                        type: "integer"
                    },
                    bottom: {
                        type: "integer"
                    }
                }
            }
        };

        var errors = await validator.validate(data, "firstModel", models);

        expect(errors.valid).toBe(true);
    });

    test('hasRefWithDefinitionPrefixUsingValidateWithMultpleErrorsTest', async () => {
        var data = {
            sample: true,
            location: {
                left: 1,
                right: 5,
                bottom: 5
            },
            type: "dataModel"
        };

        var models = {
            firstModel: {
                discriminator: "type"
            },
            dataModel: {
                required: [ "sample" ],
                properties: {
                    sample: {
                        type: "boolean"
                    },
                    location: {
                        $ref: "#/definitions/Location"
                    }
                }
            },
            Location: {
                required: [ "top", "left" ],
                properties: {
                    top: {
                        type: "integer"
                    },
                    left: {
                        type: "integer"
                    },
                    right: {
                        type: "integer"
                    },
                    bottom: {
                        type: "integer"
                    }
                }
            }
        };

        var errors = await validator.validate(data, models["firstModel"], models, false, true);

        expect(errors.valid).toBe(false);
        expect(errors.errorCount).toBe(1);
        expect(errors.errors[0].message).toBe("top is a required field");
    });

    test('hasRefWithDefinitionPrefixUsingValidateWithExtendedSample1Test', async () => {
        var data1 = {
            "AorB": {
                "type": "A",
                "existsInBothObjects": "Hello World",
                "onlyExistsInA": "This is valid"
            }
        };

        var swaggerDefinition = {
            "swagger": "2.0",
            "info": {
                "title": "Generalization Test with allOf",
                "description": "Generalization Test with allOf",
                "version": "1.0"
            },
            "paths": {
                "/getAorB": {
                    "get": {
                        "description": "Returns an instance of ParentObject",
                        "responses": {
                            "default": {
                                "description": "Returns an instance of ParentObject",
                                "schema": {
                                    "$ref": "#/definitions/ParentObject"
                                }
                            }
                        }
                    }
                }
            },
            "definitions": {
                "ParentObject": {
                    "title": "This is an object that holds either an instance of A or B",
                    "type": "object",
                    "properties": {
                        "AorB": {
                            "$ref": "#/definitions/AbstractObject"
                        }
                    }
                },
                "AbstractObject": {
                    "title": "AbstractObject",
                    "type": "object",
                    "description": "AbstractObject is an abstract Class and a Superclass of A and B.",
                    "discriminator": "type",
                    "properties": {
                        "type": {
                            "type": "string"
                        },
                        "existsInBothObjects": {
                            "type": "string",
                            "description": "This property exists in both, A and B",
                            "example": "Foo"
                        }
                    },
                    "required": [
                        "type"
                    ]
                },
                "A": {
                    "title": "A",
                    "description": "A is a Subclass of AbstractObject.",
                    "type": "object",
                    "allOf": [
                        {
                            "$ref": "#/definitions/AbstractObject"
                        }
                    ],
                    "properties": {
                        "onlyExistsInA": {
                            "type": "string",
                            "description": "This property is only valid within an A object",
                            "example": "A"
                        },
                        "type": {
                            "type": "string",
                            "enum": [
                                "A"
                            ]
                        }
                    }
                },
                "B": {
                    "title": "B",
                    "description": "B is a Subclass of AbstractObject.",
                    "type": "object",
                    "allOf": [
                        {
                            "$ref": "#/definitions/AbstractObject"
                        }
                    ],
                    "properties": {
                        "onlyExistsInB": {
                            "type": "string",
                            "description": "This property is only valid within a B object",
                            "example": "b"
                        },
                        "type": {
                            "type": "string",
                            "enum": [
                                "b"
                            ]
                        }
                    }
                }
            }
        };

        var models = swaggerDefinition.definitions;

        var errors = await validator.validate(data1, "ParentObject", models);

        expect(errors.valid).toBe(true);
    });

    test('hasRefWithDefinitionPrefixUsingValidateWithExtendedSample2Test', async () => {
        var data2 = {
            "AorB": {
                "type": "B",
                "existsInBothObjects": "Hello World",
                "onlyExistsInB": "This is valid"
            }
        };

        var swaggerDefinition = {
            "swagger": "2.0",
            "info": {
                "title": "Generalization Test with allOf",
                "description": "Generalization Test with allOf",
                "version": "1.0"
            },
            "paths": {
                "/getAorB": {
                    "get": {
                        "description": "Returns an instance of ParentObject",
                        "responses": {
                            "default": {
                                "description": "Returns an instance of ParentObject",
                                "schema": {
                                    "$ref": "#/definitions/ParentObject"
                                }
                            }
                        }
                    }
                }
            },
            "definitions": {
                "ParentObject": {
                    "title": "This is an object that holds either an instance of A or B",
                    "type": "object",
                    "properties": {
                        "AorB": {
                            "$ref": "#/definitions/AbstractObject"
                        }
                    }
                },
                "AbstractObject": {
                    "title": "AbstractObject",
                    "type": "object",
                    "description": "AbstractObject is an abstract Class and a Superclass of A and B.",
                    "discriminator": "type",
                    "properties": {
                        "type": {
                            "type": "string"
                        },
                        "existsInBothObjects": {
                            "type": "string",
                            "description": "This property exists in both, A and B",
                            "example": "Foo"
                        }
                    },
                    "required": [
                        "type"
                    ]
                },
                "A": {
                    "title": "A",
                    "description": "A is a Subclass of AbstractObject.",
                    "type": "object",
                    "allOf": [
                        {
                            "$ref": "#/definitions/AbstractObject"
                        }
                    ],
                    "properties": {
                        "onlyExistsInA": {
                            "type": "string",
                            "description": "This property is only valid within an A object",
                            "example": "A"
                        },
                        "type": {
                            "type": "string",
                            "enum": [
                                "A"
                            ]
                        }
                    }
                },
                "B": {
                    "title": "B",
                    "description": "B is a Subclass of AbstractObject.",
                    "type": "object",
                    "allOf": [
                        {
                            "$ref": "#/definitions/AbstractObject"
                        }
                    ],
                    "properties": {
                        "onlyExistsInB": {
                            "type": "string",
                            "description": "This property is only valid within a B object",
                            "example": "B"
                        },
                        "type": {
                            "type": "string",
                            "enum": [
                                "B"
                            ]
                        }
                    }
                }
            }
        };

        var models = swaggerDefinition.definitions;

        var errors = await validator.validate(data2, models["ParentObject"], models, false, true);

        expect(errors.valid).toBe(true);
    });

    test('hasRefWithDefinitionPrefixUsingValidateWithExtendedSample3Test', async () => {
        var badData3 = {
            "AorB": {
                "type": "A",
                "existsInBothObjects": "Hello World",
                "onlyExistsInB": "This property is not allowed on type A"
            }
        };

        var swaggerDefinition = {
            "swagger": "2.0",
            "info": {
                "title": "Generalization Test with allOf",
                "description": "Generalization Test with allOf",
                "version": "1.0"
            },
            "paths": {
                "/getAorB": {
                    "get": {
                        "description": "Returns an instance of ParentObject",
                        "responses": {
                            "default": {
                                "description": "Returns an instance of ParentObject",
                                "schema": {
                                    "$ref": "#/definitions/ParentObject"
                                }
                            }
                        }
                    }
                }
            },
            "definitions": {
                "ParentObject": {
                    "title": "This is an object that holds either an instance of A or B",
                    "type": "object",
                    "properties": {
                        "AorB": {
                            "$ref": "#/definitions/AbstractObject"
                        }
                    }
                },
                "AbstractObject": {
                    "title": "AbstractObject",
                    "type": "object",
                    "description": "AbstractObject is an abstract Class and a Superclass of A and B.",
                    "discriminator": "type",
                    "properties": {
                        "type": {
                            "type": "string"
                        },
                        "existsInBothObjects": {
                            "type": "string",
                            "description": "This property exists in both, A and B",
                            "example": "Foo"
                        }
                    },
                    "required": [
                        "type"
                    ]
                },
                "A": {
                    "title": "A",
                    "description": "A is a Subclass of AbstractObject.",
                    "type": "object",
                    "allOf": [
                        {
                            "$ref": "#/definitions/AbstractObject"
                        }
                    ],
                    "properties": {
                        "onlyExistsInA": {
                            "type": "string",
                            "description": "This property is only valid within an A object",
                            "example": "A"
                        },
                        "type": {
                            "type": "string",
                            "enum": [
                                "A"
                            ]
                        }
                    }
                },
                "B": {
                    "title": "B",
                    "description": "B is a Subclass of AbstractObject.",
                    "type": "object",
                    "allOf": [
                        {
                            "$ref": "#/definitions/AbstractObject"
                        }
                    ],
                    "properties": {
                        "onlyExistsInB": {
                            "type": "string",
                            "description": "This property is only valid within a B object",
                            "example": "b"
                        },
                        "type": {
                            "type": "string",
                            "enum": [
                                "b"
                            ]
                        }
                    }
                }
            }
        };

        var models = swaggerDefinition.definitions;

        var errors = await validator.validate(badData3, models["ParentObject"], models, false, true);

        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toBe("Target property 'onlyExistsInB' is not in the model");
        expect(errors.errorCount).toBe(1);
    });

    test('hasRefWithDefinitionPrefixUsingValidateWithExtendedSample4Test', async () => {
        var badData4 = {
            "AorB": {
                "type": "A",
                "existsInBothObjects": "Hello World",
                "onlyExistsInB": "This property is not allowed on type A"
            }
        };

        var swaggerDefinition = {
            "swagger": "2.0",
            "info": {
                "title": "Generalization Test with allOf",
                "description": "Generalization Test with allOf",
                "version": "1.0"
            },
            "paths": {
                "/getAorB": {
                    "get": {
                        "description": "Returns an instance of ParentObject",
                        "responses": {
                            "default": {
                                "description": "Returns an instance of ParentObject",
                                "schema": {
                                    "$ref": "#/definitions/ParentObject"
                                }
                            }
                        }
                    }
                }
            },
            "definitions": {
                "ParentObject": {
                    "title": "This is an object that holds either an instance of A or B",
                    "type": "object",
                    "properties": {
                        "AorB": {
                            "$ref": "#/definitions/AbstractObject"
                        }
                    }
                },
                "AbstractObject": {
                    "title": "AbstractObject",
                    "type": "object",
                    "description": "AbstractObject is an abstract Class and a Superclass of A and B.",
                    "discriminator": "type",
                    "properties": {
                        "type": {
                            "type": "string"
                        },
                        "existsInBothObjects": {
                            "type": "string",
                            "description": "This property exists in both, A and B",
                            "example": "Foo"
                        }
                    },
                    "required": [
                        "type"
                    ]
                },
                "A": {
                    "title": "A",
                    "description": "A is a Subclass of AbstractObject.",
                    "type": "object",
                    "allOf": [
                        {
                            "$ref": "#/definitions/AbstractObject"
                        }
                    ],
                    "properties": {
                        "onlyExistsInA": {
                            "type": "string",
                            "description": "This property is only valid within an A object",
                            "example": "A"
                        },
                        "type": {
                            "type": "string",
                            "enum": [
                                "A"
                            ]
                        }
                    }
                },
                "B": {
                    "title": "B",
                    "description": "B is a Subclass of AbstractObject.",
                    "type": "object",
                    "allOf": [
                        {
                            "$ref": "#/definitions/AbstractObject"
                        }
                    ],
                    "properties": {
                        "onlyExistsInB": {
                            "type": "string",
                            "description": "This property is only valid within a B object",
                            "example": "b"
                        },
                        "type": {
                            "type": "string",
                            "enum": [
                                "b"
                            ]
                        }
                    }
                }
            }
        };

        var models = swaggerDefinition.definitions;

        var errors = await validator.validate(badData4, models["ParentObject"], models, false, true);

        expect(errors.valid).toBe(false);
        expect(errors.errors[0].message).toBe("Target property 'onlyExistsInB' is not in the model");
        expect(errors.errorCount).toBe(1);
    });
});
