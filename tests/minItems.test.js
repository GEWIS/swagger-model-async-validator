const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;
beforeEach(() => {
    validator = new Validator();
});

describe('validationTests', () => {
    test('minItemsValidation', async () => {
        var model = {
            "user": {
                "title": "User",
                "type": "object",
                "additionalProperties": false,
                "properties": {
                    "pNumber": {
                        "type": "string",
                        "minLength": 3,
                        "maxLength": 30
                    },
                    "org": {
                        "type": "string",
                        "minLength": 3,
                        "maxLength": 30
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
                                "orgadmin",
                                "superadmin",
                                "publisher",
                                "consumer"
                            ]
                        }
                    }
                },
                "required": [
                    "pNumber",
                    "org"
                ],
                "example": {
                    "pNumber": "Excepteur amet dolore elit au",
                    "org": "anim ad",
                    "enabled": true,
                    "useRoles": [
                        "admin",
                        "orgadmin",
                        "superadmin",
                        "publisher",
                        "consumer"
                    ]
                }
            },
            "users": {
                "title": "Users",
                "type": "array",
                "items": {
                    "$ref": "#/definitions/user"
                },
                "example": [
                    {
                        "pNumber": "proiden",
                        "org": "nisi"
                    },
                    {
                        "pNumber": "dolor qui",
                        "org": "cupidatat",
                        "userRoles": [
                            "admin",
                            "orgadmin",
                            "superadmin",
                            "publisher",
                            "consumer"
                        ],
                        "enabled": false
                    },
                    {
                        "pNumber": "occaecat in dolore ad",
                        "org": "ex cons",
                        "enabled": true,
                        "userRoles": [
                            "admin",
                            "orgadmin",
                            "superadmin",
                            "publisher",
                            "consumer"
                        ]
                    },
                    {
                        "pNumber": "tempor sed deserun",
                        "org": "labore Excepteur eiusmod qui e",
                        "userRoles": [
                            "admin",
                            "orgadmin",
                            "superadmin",
                            "publisher",
                            "consumer"
                        ]
                    },
                    {
                        "pNumber": "id v",
                        "org": "dolor q",
                        "userRoles": [
                            "admin",
                            "orgadmin",
                            "superadmin",
                            "publisher",
                            "consumer"
                        ]
                    }
                ]
            }
        };

        var data = {
            "pNumber": "generated_pNumber.toString()",
            "org": "ese",
            "enabled": true,
            "userRoles": []
        };

        validator = new Validator();

        var result = await validator.validate(data, model.user, model);
        expect(result.valid).toBe(false);
        expect(result.errors[0].message).toEqual("Array requires at least 1 item(s) and has 0 item(s).")
    })
    test('minItemsEqualValidation', async () => {
        var model = {
            "user": {
                "title": "User",
                "type": "object",
                "additionalProperties": false,
                "properties": {
                    "pNumber": {
                        "type": "string",
                        "minLength": 3,
                        "maxLength": 30
                    },
                    "org": {
                        "type": "string",
                        "minLength": 3,
                        "maxLength": 30
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
                                "orgadmin",
                                "superadmin",
                                "publisher",
                                "consumer"
                            ]
                        }
                    }
                },
                "required": [
                    "pNumber",
                    "org"
                ],
                "example": {
                    "pNumber": "Excepteur amet dolore elit au",
                    "org": "anim ad",
                    "enabled": true,
                    "useRoles": [
                        "admin",
                        "orgadmin",
                        "superadmin",
                        "publisher",
                        "consumer"
                    ]
                }
            },
            "users": {
                "title": "Users",
                "type": "array",
                "items": {
                    "$ref": "#/definitions/user"
                },
                "example": [
                    {
                        "pNumber": "proiden",
                        "org": "nisi"
                    },
                    {
                        "pNumber": "dolor qui",
                        "org": "cupidatat",
                        "userRoles": [
                            "admin",
                            "orgadmin",
                            "superadmin",
                            "publisher",
                            "consumer"
                        ],
                        "enabled": false
                    },
                    {
                        "pNumber": "occaecat in dolore ad",
                        "org": "ex cons",
                        "enabled": true,
                        "userRoles": [
                            "admin",
                            "orgadmin",
                            "superadmin",
                            "publisher",
                            "consumer"
                        ]
                    },
                    {
                        "pNumber": "tempor sed deserun",
                        "org": "labore Excepteur eiusmod qui e",
                        "userRoles": [
                            "admin",
                            "orgadmin",
                            "superadmin",
                            "publisher",
                            "consumer"
                        ]
                    },
                    {
                        "pNumber": "id v",
                        "org": "dolor q",
                        "userRoles": [
                            "admin",
                            "orgadmin",
                            "superadmin",
                            "publisher",
                            "consumer"
                        ]
                    }
                ]
            }
        };

        var data = {
            "pNumber": "generated_pNumber.toString()",
            "org": "ese",
            "enabled": true,
            "userRoles": [
                "admin"
            ]
        };

        validator = new Validator();

        var result = await validator.validate(data, model.user, model);

        expect(result.valid).toBe(true);
    })
    test('maxItemsValidation', async () => {
        var model = {
            "user": {
                "title": "User",
                "type": "object",
                "additionalProperties": false,
                "properties": {
                    "pNumber": {
                        "type": "string",
                        "minLength": 3,
                        "maxLength": 30
                    },
                    "org": {
                        "type": "string",
                        "minLength": 3,
                        "maxLength": 30
                    },
                    "enabled": {
                        "type": "boolean"
                    },
                    "userRoles": {
                        "type": "array",
                        "uniqueItems": true,
                        "minItems": 1,
                        "maxItems": 2,
                        "items": {
                            "type": "string",
                            "enum": [
                                "admin",
                                "orgadmin",
                                "superadmin",
                                "publisher",
                                "consumer"
                            ]
                        }
                    }
                },
                "required": [
                    "pNumber",
                    "org"
                ],
                "example": {
                    "pNumber": "Excepteur amet dolore elit au",
                    "org": "anim ad",
                    "enabled": true,
                    "useRoles": [
                        "admin",
                        "orgadmin",
                        "superadmin",
                        "publisher",
                        "consumer"
                    ]
                }
            },
            "users": {
                "title": "Users",
                "type": "array",
                "items": {
                    "$ref": "#/definitions/user"
                },
                "example": [
                    {
                        "pNumber": "proiden",
                        "org": "nisi"
                    },
                    {
                        "pNumber": "dolor qui",
                        "org": "cupidatat",
                        "userRoles": [
                            "admin",
                            "orgadmin",
                            "superadmin",
                            "publisher",
                            "consumer"
                        ],
                        "enabled": false
                    },
                    {
                        "pNumber": "occaecat in dolore ad",
                        "org": "ex cons",
                        "enabled": true,
                        "userRoles": [
                            "admin",
                            "orgadmin",
                            "superadmin",
                            "publisher",
                            "consumer"
                        ]
                    },
                    {
                        "pNumber": "tempor sed deserun",
                        "org": "labore Excepteur eiusmod qui e",
                        "userRoles": [
                            "admin",
                            "orgadmin",
                            "superadmin",
                            "publisher",
                            "consumer"
                        ]
                    },
                    {
                        "pNumber": "id v",
                        "org": "dolor q",
                        "userRoles": [
                            "admin",
                            "orgadmin",
                            "superadmin",
                            "publisher",
                            "consumer"
                        ]
                    }
                ]
            }
        };

        var data = {
            "pNumber": "generated_pNumber.toString()",
            "org": "ese",
            "enabled": true,
            "userRoles": [
                "admin",
                "orgadmin",
                "superadmin"
            ]
        };

        validator = new Validator();

        var result = await validator.validate(data, model.user, model);
        expect(result.valid).toBe(false);
        expect(result.errors[0].message).toEqual("Array requires no more than 2 item(s) and has 3 item(s).")
    })
    test('maxItemsEqualValidation', async () => {
        var model = {
            "user": {
                "title": "User",
                "type": "object",
                "additionalProperties": false,
                "properties": {
                    "pNumber": {
                        "type": "string",
                        "minLength": 3,
                        "maxLength": 30
                    },
                    "org": {
                        "type": "string",
                        "minLength": 3,
                        "maxLength": 30
                    },
                    "enabled": {
                        "type": "boolean"
                    },
                    "userRoles": {
                        "type": "array",
                        "uniqueItems": true,
                        "minItems": 1,
                        "maxItems": 2,
                        "items": {
                            "type": "string",
                            "enum": [
                                "admin",
                                "orgadmin",
                                "superadmin",
                                "publisher",
                                "consumer"
                            ]
                        }
                    }
                },
                "required": [
                    "pNumber",
                    "org"
                ],
                "example": {
                    "pNumber": "Excepteur amet dolore elit au",
                    "org": "anim ad",
                    "enabled": true,
                    "useRoles": [
                        "admin",
                        "orgadmin",
                        "superadmin",
                        "publisher",
                        "consumer"
                    ]
                }
            },
            "users": {
                "title": "Users",
                "type": "array",
                "items": {
                    "$ref": "#/definitions/user"
                },
                "example": [
                    {
                        "pNumber": "proiden",
                        "org": "nisi"
                    },
                    {
                        "pNumber": "dolor qui",
                        "org": "cupidatat",
                        "userRoles": [
                            "admin",
                            "orgadmin",
                            "superadmin",
                            "publisher",
                            "consumer"
                        ],
                        "enabled": false
                    },
                    {
                        "pNumber": "occaecat in dolore ad",
                        "org": "ex cons",
                        "enabled": true,
                        "userRoles": [
                            "admin",
                            "orgadmin",
                            "superadmin",
                            "publisher",
                            "consumer"
                        ]
                    },
                    {
                        "pNumber": "tempor sed deserun",
                        "org": "labore Excepteur eiusmod qui e",
                        "userRoles": [
                            "admin",
                            "orgadmin",
                            "superadmin",
                            "publisher",
                            "consumer"
                        ]
                    },
                    {
                        "pNumber": "id v",
                        "org": "dolor q",
                        "userRoles": [
                            "admin",
                            "orgadmin",
                            "superadmin",
                            "publisher",
                            "consumer"
                        ]
                    }
                ]
            }
        };

        var data = {
            "pNumber": "generated_pNumber.toString()",
            "org": "ese",
            "enabled": true,
            "userRoles": [
                "admin",
                "orgadmin"
            ]
        };

        validator = new Validator();

        var result = await validator.validate(data, model.user, model);
        expect(result.valid).toBe(true);
    })
});
