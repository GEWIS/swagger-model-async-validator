const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;
beforeEach(() => {
    validator = new Validator();
});
describe('validationTests', () => {
    test('hasStringRefTest', async () => {
        var data = {
            biotype: 'protein_coding',
            location: {
                top: 1,
                left: 1,
                right: 5,
                bottom: 5
            }
        };
        var models = {
            dataModel: {
                required: ["biotype"],
                properties: {
                    biotype: {
                        $ref: "biotype"
                    },
                    location: {
                        $ref: "Location"
                    }
                }
            },
            biotype: {
                type: "string",
                enum: [
                    "protein_coding",
                    "miRNA"
                ]
            },
            Location: {
                required: ["top", "left"],
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
        var errors = await validator.validate(data, models["dataModel"], models);
        expect(errors.valid).toBe(true);
    });
    test('hasNumberRefTest', async () => {
        var data = {
            biotype: 1,
            location: {
                top: 1,
                left: 1,
                right: 5,
                bottom: 5
            }
        };
        var models = {
            dataModel: {
                required: ["biotype"],
                properties: {
                    biotype: {
                        $ref: "biotype"
                    },
                    location: {
                        $ref: "Location"
                    }
                }
            },
            biotype: {
                type: "number"
            },
            Location: {
                required: ["top", "left"],
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
        var errors = await validator.validate(data, models["dataModel"], models);
        expect(errors.valid).toBe(true);
    });
    test('hasEmptyArrayRefTest', async () => {
        var data = {
            biotype: [],
            location: {
                top: 1,
                left: 1,
                right: 5,
                bottom: 5
            }
        };
        var models = {
            dataModel: {
                required: ["biotype"],
                properties: {
                    biotype: {
                        $ref: "biotype"
                    },
                    location: {
                        $ref: "Location"
                    }
                }
            },
            biotype: {
                type: 'array',
                items: {
                    type: "string"
                }
            },
            Location: {
                required: ["top", "left"],
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
        var errors = await validator.validate(data, models["dataModel"], models);
        expect(errors.valid).toBe(true);
    });
    test('hasObjectWithNoPropertiesRefTest', async () => {
        var data = {
            biotype: {
                'protein_coding': 'miRNA'
            },
            location: {
                top: 1,
                left: 1,
                right: 5,
                bottom: 5
            }
        };
        var models = {
            dataModel: {
                required: ["biotype"],
                properties: {
                    biotype: {
                        $ref: "biotype"
                    },
                    location: {
                        $ref: "Location"
                    }
                }
            },
            biotype: {
                type: "object"
            },
            Location: {
                required: ["top", "left"],
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
        var errors = await validator.validate(data, models["dataModel"], models);
        expect(errors.valid).toBe(true);
    });
    test('hasStringInvalidRefTest', async () => {
        var data = {
            biotype: 'FOOBAHR',
            location: {
                top: 1,
                left: 1,
                right: 5,
                bottom: 5
            }
        };
        var models = {
            dataModel: {
                required: ["biotype"],
                properties: {
                    biotype: {
                        $ref: "biotype"
                    },
                    location: {
                        $ref: "Location"
                    }
                }
            },
            biotype: {
                type: "string",
                enum: [
                    "protein_coding",
                    "miRNA"
                ]
            },
            Location: {
                required: ["top", "left"],
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
        var errors = await validator.validate(data, models["dataModel"], models);
        expect(errors.valid).toBe(false);
    });
});
