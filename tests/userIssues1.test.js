const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;
beforeEach(() => {
    validator = new Validator();
});
describe('validatorTests', () => {
    test('testBadDataAgainstModel1', async () => {
        expect.assertions(3);
        var model = {
            "id":"Reading",
            "required": ["sensor_name", "reading_time", "reading_value"],
            "properties": {
                "sensor_name": {
                    "type": "string",
                    "description": "Source of the message (e.g. 'Water Temperature', or 'system' if it is a system message)"
                },
                "reading_time": {
                    "type": "string",
                    "format": "date-time",
                    "description": "Date and time the message was created"
                },
                "reading_value": {
                    "type": "string",
                    "description": "Content of the message (e.g. '22.6' or 'Reset triggered')"
                }
            }
        };
        var data = {'sensor_name': 'light', 'reading_time': 'this-is-not-a-date', 'reading_value': '27'};
        validator.addFieldValidator("testModel", "id", function(name, value) {
            if(value === 34) {
                return new Error("Value Cannot be 34");
            }
            return null;
        });
        var result = await validator.validate(data, model);
        expect(result.valid).toBe(false);
        expect(result.errorCount).toBe(1);
        expect(result.errors[0].message).toBe("reading_time (this-is-not-a-date) is not a type of date-time");
    });
    test('testBadDataAgainstModel2', async () => {
        expect.assertions(2);
        var model = {};
        var data = {'sensor_name': 'light', 'reading_time': 'this-is-not-a-date', 'reading_value': '27'};
        validator.addFieldValidator("testModel", "id", function(name, value) {
            if(value === 34) {
                return new Error("Value Cannot be 34");
            }
            return null;
        });
        var result = await validator.validate(data, model);
        expect(result.valid).toBe(true);
        expect(result.errorCount).toBe(0);
    });
    test('testUndefinedRequiredItem', async () => {
        expect.assertions(1);
        var model = {
            type: "object",
            required: [ "propertyOfModel" ],
            properties: {
                propertyOfModel: {
                    type: "string"
                }
            }
        };
        var target = { propertyOfModel: undefined }
        var result = await validator.validate(target, model);
        expect(result.valid).toBe(false);
    });
});
