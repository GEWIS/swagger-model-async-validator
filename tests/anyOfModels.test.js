const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;

beforeEach(() => {
    validator = new Validator();
});

describe('Ref Tests', () => {
    test('validAnyOfValueTest', async () => {
        const data = {
            type: "Type 3"
        };

        const models = {
            dataModel: {
                type: "object",
                required: [ "type" ],
                properties: {
                    type: {
                        anyOf: [
                            {
                                type: "string",
                                enum: [ "Type 1", "Type 2" ]
                            },
                            {
                                type: "string",
                                enum: [ "Type 3" ]
                            }
                        ]
                    }
                }
            }
        };

        const errors = await validator.validate(data, models["dataModel"], models);
        expect(errors.valid).toBe(true);
    });

    test('invalidAnyOfValueTest', async () => {
        const data = {
            type: "Type 4"
        };

        const models = {
            dataModel: {
                type: "object",
                required: [ "type" ],
                properties: {
                    type: {
                        anyOf: [
                            {
                                type: "string",
                                enum: [ "Type 1", "Type 2" ]
                            },
                            {
                                type: "string",
                                enum: [ "Type 3" ]
                            }
                        ]
                    }
                }
            }
        };

        const errors = await validator.validate(data, models["dataModel"], models);

        expect(errors.valid).toBe(false);
        expect(errors.errorCount).toBe(2);
        expect(errors.errors[0].message).toBe("type is not a valid target for anyOf");
        expect(errors.errors[1].message).toBe("type is not a valid target for anyOf");
    });

    test('AnyOfDiscriminatorTest', async () => {
        const data = {
            pet_type: "Cat"
        };

        const models = {
            dataModel: {
                type: "array",
                items: {
                    oneOf: [
                        { "$ref": "#/components/schemas/Cat" },
                        { "$ref": "#/components/schemas/Dog" }
                    ],
                    discriminator: {
                        propertyName: "pet_type"
                    }
                }
            },
            Pet: {
                type: "object",
                required: [ "pet_type" ],
                properties: {
                    pet_type: {
                        type: "string"
                    }
                },
                discriminator: {
                    propertyName: "pet_type"
                }
            },
            Dog: {
                allOf: [
                    { "$ref": "#/components/schemas/Pet" },
                    {
                        type: "object",
                        required: [ "bark", "breed" ],
                        properties: {
                            bark: {
                                type: "boolean"
                            },
                            breed: {
                                type: "string",
                                enum: [ "Dingo", "Husky", "Retriever", "Shepherd" ]
                            }
                        }
                    }
                ]
            },
            Cat: {
                allOf: [
                    { "$ref": "#/components/schemas/Pet" },
                    {
                        type: "object",
                        required: [ "age" ],
                        properties: {
                            hunts: {
                                type: "boolean"
                            },
                            age: {
                                type: "integer"
                            }
                        }
                    }
                ]
            }
        };

        const errors = await validator.validate([data], models["dataModel"], models);

        expect(errors.valid).toBe(false);
        expect(errors.errorCount).toBe(1);
        expect(errors.errors[0].message).toBe('age is a required field');
    });

    test('AnyOfDiscriminatorMappingTest', async() => {
        const data = [
            { pet_type: "Cat" },
            { pet_type: "Kitten" },
            { pet_type: "Dog" },
            { pet_type: "Puppy" },
            { pet_type: "Hamster" }
        ];

        const models = {
            dataModel: {
                type: "array",
                items: {
                    oneOf: [
                        { "$ref": "#/components/schemas/CatModel" },
                        { "$ref": "#/components/schemas/DogModel" }
                    ],
                    discriminator: {
                        propertyName: "pet_type",
                        mapping: {
                            Cat: "#/components/schemas/CatModel",
                            Kitten: "CatModel",
                            Dog: "DogModel",
                            Puppy: "DogModel"
                        }
                    }
                }
            },
            Pet: {
                type: "object",
                required: [ "pet_type" ],
                properties: {
                    pet_type: {
                        type: "string"
                    }
                },
                discriminator: {
                    propertyName: "pet_type"
                }
            },
            DogModel: {
                allOf: [
                    { "$ref": "#/components/schemas/Pet" },
                    {
                        type: "object",
                        required: [ "bark" ],
                        properties: {
                            bark: {
                                type: "boolean"
                            },
                            breed: {
                                type: "string",
                                enum: [ "Dingo", "Husky", "Retriever", "Shepherd" ]
                            }
                        }
                    }
                ]
            },
            CatModel: {
                allOf: [
                    { "$ref": "#/components/schemas/Pet" },
                    {
                        type: "object",
                        required: [ "age" ],
                        properties: {
                            hunts: {
                                type: "boolean"
                            },
                            age: {
                                type: "integer"
                            }
                        }
                    }
                ]
            }
        };

        const errors = await validator.validate(data, models["dataModel"], models);

        expect(errors.valid).toBe(false);
        expect(errors.errorCount).toBe(5);
        expect(errors.errors[4].message).toBe('Item 4 in Array (rootModel) contains an object that is not one of the possible types');
    });
});
