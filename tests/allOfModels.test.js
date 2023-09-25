const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;

beforeEach(() => {
    validator = new Validator();
});

describe('Ref Tests', () => {
    test('hasAllOfTest', async() => {
        const data = {
            sample: true,
            top: 1,
            left: 1,
            right: 5,
            bottom: 5
        };

        const models = {
            dataModel: {
                required: [ "sample" ],
                allOf: [
                    {
                        $ref: '#/definitions/Location'
                    }
                ],
                properties: {
                    sample: {
                        type: "boolean"
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

        const errors = await validator.validate(data, models["dataModel"], models);

        expect(errors.valid).toBe(true);
    });

    test('hasAllOfTest2', async () => {
        const data = {
            sample: true,
            top: 1,
            left: 1,
            right: 5,
            bottom: 5
        };

        const models = {
            dataModel: {
                allOf: [
                    {
                        $ref: '#/definitions/Location'
                    },
                    {
                        properties: {
                            sample: {
                                type: "boolean"
                            }
                        }
                    },
                    {
                        required: [ "sample" ]
                    }
                ]
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

        const errors = await validator.validate(data, models["dataModel"], models);

        expect(errors.valid).toBe(true);
    });

    test('hasAllOfTestWithMissingRequiredFields', async() => {
        const data = {
            left: 1,
            right: 5,
            bottom: 5
        };

        const models = {
            dataModel: {
                allOf: [
                    {
                        $ref: '#/definitions/Location'
                    },
                    {
                        properties: {
                            sample: {
                                type: "boolean"
                            }
                        }
                    },
                    {
                        required: [ "sample" ]
                    }
                ]
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

        const errors = await validator.validate(data, models["dataModel"], models);

        expect(errors.valid).toBe(false);
    });

    test('hasAllOfWithRefAlsoHavingAllOfTest', async() => {
        const data = {
            sample: true,
            top: 1,
            left: 1,
            right: 5,
            bottom: 5
        };

        const models = {
            dataModel: {
                allOf: [
                    {
                        $ref: '#/definitions/Location1'
                    },
                    {
                        properties: {
                            sample: {
                                type: "boolean"
                            }
                        }
                    },
                    {
                        required: [ "sample" ]
                    }
                ]
            },
            Location1: {
                allOf: [
                    {
                        $ref: '#/definitions/Location2'
                    },
                    {
                        required: [ "top" ]
                    },
                    {
                        properties: {
                            top: {
                                type: "integer"
                            },
                            bottom: {
                                type: "integer"
                            }
                        }
                    }
                ]
            },
            Location2: {
                required: [ "left" ],
                properties: {
                    left: {
                        type: "integer"
                    },
                    right: {
                        type: "integer"
                    }
                }
            }

        };

        const errors = await validator.validate(data, models["dataModel"], models);

        expect(errors.valid).toBe(true);
    });

    test('hasAllOfWithRefAlsoHavingAllOfTestWithMissingRequiredFields', async () => {
        const data = {
            sample: true,
            left: 1,
            right: 5,
            bottom: 5
        };

        const models = {
            dataModel: {
                allOf: [
                    {
                        $ref: '#/definitions/Location1'
                    },
                    {
                        properties: {
                            sample: {
                                type: "boolean"
                            }
                        }
                    },
                    {
                        required: [ "sample" ]
                    }
                ]
            },
            Location1: {
                allOf: [
                    {
                        $ref: '#/definitions/Location2'
                    },
                    {
                        required: [ "top" ]
                    },
                    {
                        properties: {
                            top: {
                                type: "integer"
                            },
                            bottom: {
                                type: "integer"
                            }
                        }
                    }
                ]
            },
            Location2: {
                required: [ "left" ],
                properties: {
                    left: {
                        type: "integer"
                    },
                    right: {
                        type: "integer"
                    }
                }
            }

        };

        const errors = await validator.validate(data, models["dataModel"], models);

        expect(errors.valid).toBe(false);
    });

    test('hasAllOfPropertyTestWithMissingRequiredFields', async () => {
        const data = {
            location: {
                top: 1,
            }
        };

        const models = {
            dataModel: {
                type: "object",
                required: [ "location" ],
                properties: {
                    location: {
                        allOf: [
                            {
                                $ref: '#/definitions/Location'
                            },
                            {
                                type: "object",
                                required: [ "sample" ],
                                properties: {
                                    sample: {
                                        type: "boolean"
                                    }
                                }
                            },
                        ]
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

        const errors = await validator.validate(data, models["dataModel"], models);

        expect(errors.valid).toBe(false);
        expect(errors.errorCount).toBe(2);
        expect(errors.errors[0].message).toBe('left is a required field');
        expect(errors.errors[1].message).toBe('sample is a required field');
    });

    test('hasAllOf', async () => {
        const data = {
            sample: true,
            location: {
                right: 1,
                bottom: 1
            }
        };

        const models = {
            dataModel: {
                allOf: [{
                    properties: {
                        sample: {
                            type: "boolean"
                        }
                    }
                }, {
                    properties: {
                        location: {
                            type: 'object',
                            properties: {
                                right: {
                                    type: "integer"
                                },
                                bottom: {
                                    type: "integer"
                                }
                            }
                        }
                    }
                }]
            }
        };

        const errors = await validator.validate(data, models["dataModel"], models);

        expect(errors.valid).toBe(true);
    });

    test('hasAllOfError', async () => {
        const data = {
            sample: true,
            location: {
                right: "Not an integer",
                bottom: 1
            }
        };

        const model = {
            "type": "object",
            allOf: [{
                properties: {
                    sample: {
                        type: "boolean"
                    }
                }
            }, {
                properties: {
                    location: {
                        type: "object",
                        properties: {
                            right: {
                                type: "integer"
                            },
                            bottom: {
                                type: "integer"
                            }
                        }
                    }
                }
            }]
        };

        const errors = await validator.validate(data, model);

        expect(errors.valid).toBe(false);
        expect(errors.errorCount).toBe(1);
    });

    test('hasAllOfWithRef', async () => {
        const data = {
            sample: true,
            location: {
                right: 1,
                bottom: 1
            }
        };

        const models = {
            dataModel: {
                allOf: [{
                    properties: {
                        sample: {
                            type: "boolean"
                        }
                    }
                }, {
                    $ref: "Location"
                }]
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
                        type: "integer",
                        maximum: 2
                    }
                }
            }
        };

        const errors = await validator.validate(data, models["dataModel"], models);

        expect(errors.valid).toBe(false);
        expect(errors.errorCount).toBe(2);
    });

    test('hasNestedAllOfWithRef', async () => {
        const data = {
            sample: true,
            top: "Not an integer",
            left: 1
        };

        const models = {
            dataModel: {
                type: "object",
                allOf: [{
                    properties: {
                        sample: {
                            type: "boolean"
                        }
                    }
                }, {
                    $ref: "Location"
                }]
            },
            Location: {
                allOf: [{
                    properties: {
                        top: {
                            type: "integer"
                        }
                    }
                }, {
                    properties: {
                        left: {
                            type: "integer"
                        }
                    }
                }]
            }
        };

        const errors = await validator.validate(data, models["dataModel"], models);

        expect(errors.valid).toBe(false);
        expect(errors.errorCount).toBe(1);
    });
});
