const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;
beforeEach(() => {
    validator = new Validator();
});
describe('validationTests', () => {
    test('validateDate', async () => {
        const data = {
            travis: 'test',
            dob: '2014-02-01'
        };
        const model = {
            properties: {
                dob: {
                    type: 'string',
                    format: 'date'
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBeTruthy();
    });
    test('validateDateAsDate', async () => {
        const data = {
            travis: 'test',
            dob: new Date('2014-02-01')
        };
        const model = {
            properties: {
                dob: {
                    type: 'string',
                    format: 'date'
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBeTruthy();
    });
    test('validateNotADate', async () => {
        const data = {
            travis: 'test',
            dob: 'This is NOt a Date'
        };
        const model = {
            properties: {
                dob: {
                    type: 'string',
                    format: 'date'
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBeFalsy();
        expect(JSON.stringify(errors)).not.toBeFalsy();
    });
    test('validateNumberAsDateFails', async () => {
        const data = {
            travis: 'test',
            dob: '3456'
        };
        const model = {
            properties: {
                dob: {
                    type: 'string',
                    format: 'date'
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBeFalsy();
    });
    test('validateDateTimeWhenJustDate', async () => {
        const data = {
            "salutation": "Mr Death",
            "dateOfBirth": "2014-01-01"
        };
        const model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date-time'
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBeTruthy();
    });
    test('validateDateFormatOk', async () => {
        const data = {
            "salutation": "Mr Death",
            "dateOfBirth": "2014-01-01"
        };
        const model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date'
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBeTruthy();
    });
    test('validateDateFormatFailed', async () => {
        const data = {
            "salutation": "Mr Death",
            "dateOfBirth": "2014-1-1"
        };
        const model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date'
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBeFalsy();
    });
    test('validateDateTime', async () => {
        const data = {
            "salutation": "Mr Death",
            "dateOfBirth": "2014-01-01T12:00:00"
        };
        const model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date'
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBeFalsy();
        expect(errors.errorCount).toBe(1);
        expect(errors.errors[0].message).toBe('dateOfBirth (2014-01-01T12:00:00) is not a type of date');
    });
    test('validateDateTimeGreaterThanMinimum', async () => {
        const data = {
            "salutation": "Mr Death",
            "dateOfBirth": "2014-01-02"
        };
        const model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date-time',
                    minimum: "2014-01-01"
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBeTruthy();
    });
    test('validateDateTimeGreaterThanMinimumWhenDate', async () => {
        const data = {
            "salutation": "Mr Death",
            "dateOfBirth": new Date("2014-01-02")
        };
        const model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date-time',
                    minimum: "2014-01-01"
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBeTruthy();
    });
    test('validateDateTimeEqualToMinimum', async () => {
        const data = {
            "salutation": "Mr Death",
            "dateOfBirth": "2014-01-01"
        };
        const model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date-time',
                    minimum: "2014-01-01"
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBeTruthy();
    });
    test('validateDateTimeEqualToMinimumWhenDate', async () => {
        const data = {
            "salutation": "Mr Death",
            "dateOfBirth": new Date("2014-01-01")
        };
        const model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date-time',
                    minimum: "2014-01-01"
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBeTruthy();
    });
    test('validateDateTimeLessThanMinimum', async () => {
        const data = {
            "salutation": "Mr Death",
            "dateOfBirth": "2014-01-01"
        };
        const model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date-time',
                    minimum: "2014-01-02"
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBeFalsy();
    });
    test('validateDateTimeLessThanMinimumWhenDate', async () => {
        const data = {
            "salutation": "Mr Death",
            "dateOfBirth": new Date("2014-01-01")
        };
        const model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date-time',
                    minimum: "2014-01-02"
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBeFalsy();
    });
    test('validateDateTimeGreaterThanMaximum', async () => {
        const data = {
            "salutation": "Mr Death",
            "dateOfBirth": "2014-01-02"
        };
        const model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date-time',
                    maximum: "2014-01-01"
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBeFalsy();
    });
    test('validateDateTimeEqualToMaximum', async () => {
        const data = {
            "salutation": "Mr Death",
            "dateOfBirth": "2014-01-01"
        };
        const model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date-time',
                    maximum: "2014-01-01"
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBeTruthy();
    });
    test('validateDateTimeLessThanMaximim', async () => {
        const data = {
            "salutation": "Mr Death",
            "dateOfBirth": "2014-01-01"
        };
        const model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date-time',
                    maximum: "2014-01-02"
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBeTruthy();
    });
    test('validateDateTimeGreaterThanExclusiveMinimum', async () => {
        const data = {
            "salutation": "Mr Death",
            "dateOfBirth": "2014-01-02"
        };
        const model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date-time',
                    exclusiveMinimum: "2014-01-01"
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBeTruthy();
    });
    test('validateDateTimeEqualToExclusiveMinimum', async () => {
        const data = {
            "salutation": "Mr Death",
            "dateOfBirth": "2014-01-01"
        };
        const model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date-time',
                    exclusiveMinimum: "2014-01-01"
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBeFalsy();
    });
    test('validateDateTimeLessThanExclusiveMinimum', async () => {
        const data = {
            "salutation": "Mr Death",
            "dateOfBirth": "2014-01-01"
        };
        const model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date-time',
                    exclusiveMinimum: "2014-01-02"
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBeFalsy();
    });
    test('validateDateTimeGreaterThanExclusiveMaximum', async () => {
        const data = {
            "salutation": "Mr Death",
            "dateOfBirth": "2014-01-02"
        };
        const model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date-time',
                    exclusiveMaximum: "2014-01-01"
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBeFalsy();
    });
    test('validateDateTimeEqualToExclusiveMaximum', async () => {
        const data = {
            "salutation": "Mr Death",
            "dateOfBirth": "2014-01-01"
        };
        const model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date-time',
                    exclusiveMaximum: "2014-01-01"
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBeFalsy();
    });
    test('validateDateTimeLessThanExclusiveMaximim', async () => {
        const data = {
            "salutation": "Mr Death",
            "dateOfBirth": "2014-01-01"
        };
        const model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date-time',
                    exclusiveMaximum: "2014-01-02"
                }
            }
        };
        const errors = await validator.validate(data, model);
        expect(errors.valid).toBeTruthy();
    });
    test('validateDateTimeLessThanExclusiveMaximim2', async () => {
        const data = {
            "salutation": "Mr Death",
            "dateOfBirth": new Date(2013, 10, 4)
        };
        const model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date-time',
                    exclusiveMaximum: "2014-01-02"
                }
            }
        };
        const json = JSON.stringify(data);
        const target = JSON.parse(json);
        const errors = await validator.validate(target, model);
        expect(errors.valid).toBeTruthy();
    });
});
