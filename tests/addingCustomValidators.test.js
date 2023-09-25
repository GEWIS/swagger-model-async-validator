const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;

beforeEach(() => {
    validator = new Validator();
});

describe('Validator Tests', () => {
    test('addBlankError', () => {
        expect(() => validator.addFieldValidator()).toThrow('ModelName is required');
    });

    test('addFunctionAsModelNameNotAStringError', () => {
        expect(() => validator.addFieldValidator(() => {})).toThrow('ModelName must be a string');
    });

    test('addBlankFieldNameError', () => {
        expect(() => validator.addFieldValidator("test")).toThrow('FieldName is required');
    });

    test('addFunctionAsFieldNameError', () => {
        expect(() => validator.addFieldValidator("test", () => {})).toThrow('FieldName must be a string');
    });

    test('addBlankFunctionError', () => {
        expect(() => validator.addFieldValidator("test", "field")).toThrow('ValidatorFunction is required');
    });

    test('addFunctionAsModelName', () => {
        validator.addFieldValidator("test", "field", () => {});
        expect(validator.getFieldValidators("test", "field")).toBeTruthy();
    });

    test('addFunctionAsModelName2', () => {
        validator.addFieldValidator("test", "field", () => {});
        expect(validator.getCustomValidator().getFieldValidators("test", "field")).toBeTruthy();
    });

    test('testCustomValidationRun', async () => {
        const model = {
            id: "testModel",
            properties: {
                id: {
                    type: "integer"
                }
            }
        };

        const data = {
            id: 34
        };

        validator = new Validator();
        validator.addFieldValidator("testModel", "id", (name, value) => {
            if (value === 34) {
                return new Error("Value Cannot be 34");
            }

            return null;
        });
        const result = await validator.validate(data, model);

        expect(result.valid).toBe(false);
        expect(result.errorCount).toBe(1);
    });

    test('testCustomValidationAddedToModelRun', async () => {
        const model = {
            properties: {
                id: {
                    type: "integer"
                }
            }
        };

        const data = {
            id: 34
        };

        validator = new Validator();
        validator.addFieldValidatorToModel(model, "id", (name, value) => {
            if (value === 34) {
                return new Error("Value Cannot be 34");
            }

            return null;
        });
        const result = await validator.validate(data, model);

        expect(result.valid).toBe(false);
        expect(result.errorCount).toBe(1);
    });

    test('testCustomValidationAddedToModelWithIdRun', async () => {
        const model = {
            id: "testModel",
            properties: {
                id: {
                    type: "integer"
                }
            }
        };

        const data = {
            id: 34
        };

        validator = new Validator();
        validator.addFieldValidatorToModel(model, "id", (name, value) => {
            if (value === 34) {
                return new Error("Value Cannot be 34");
            }

            return null;
        });
        const result = await validator.validate(data, model);

        expect(result.valid).toBe(false);
        expect(result.errorCount).toBe(1);
    });

    test('testCustomValidationReturnsArrayRun', async () => {
        const model = {
            id: "testModel",
            properties: {
                id: {
                    type: "integer"
                }
            }
        };

        const data = {
            id: 34
        };

        validator = new Validator();
        validator.addFieldValidator("testModel", "id", (name, value) => {
            const errors = [];
            if (value === 34) {
                errors.push(new Error("Value Cannot be 34"));
            }

            if (value < 40) {
                errors.push(new Error("Value must be at least 40"));
            }

            return errors.length > 0 ? errors : null;
        });
        const result = await validator.validate(data, model);

        expect(result.valid).toBe(false);
        expect(result.errorCount).toBe(2);
    });

    test('testCustomValidationReturnsNullRun', async() => {
        const model = {
            id: "testModel",
            properties: {
                id: {
                    type: "integer"
                }
            }
        };

        const data = {
            id: 41
        };

        validator = new Validator();
        validator.addFieldValidator("testModel", "id", (name, value) => {
            const errors = [];
            if (value === 34) {
                errors.push(new Error("Value Cannot be 34"));
            }

            if (value < 40) {
                errors.push(new Error("Value must be at least 40"));
            }

            return errors.length > 0 ? errors : null;
        });
        const result = await validator.validate(data, model);

        expect(result.valid).toBe(true);
        expect(result.errorCount).toBe(0);
    });

    test('testCustomValidationReturnsEmptyArrayRun', async () => {
        const model = {
            id: "testModel",
            properties: {
                id: {
                    type: "integer"
                }
            }
        };

        const data = {
            id: 41
        };

        validator = new Validator();
        validator.addFieldValidator("testModel", "id", (name, value) => {
            const errors = [];
            if (value === 34) {
                errors.push(new Error("Value Cannot be 34"));
            }

            if (value < 40) {
                errors.push(new Error("Value must be at least 40"));
            }

            return errors;
        });
        const result = await validator.validate(data, model);

        expect(result.valid).toBe(true);
        expect(result.errorCount).toBe(0);
    });

    test('testCustomValidationReturnsUndefinedRun', async () => {
        const model = {
            id: "testModel",
            properties: {
                id: {
                    type: "integer"
                }
            }
        };

        const data = {
            id: 41
        };

        validator = new Validator();
        validator.addFieldValidator("testModel", "id", (name, value) => {
            const errors = [];
            if (value === 34) {
                errors.push(new Error("Value Cannot be 34"));
            }

            if (value < 40) {
                errors.push(new Error("Value must be at least 40"));
            }

            return undefined;
        });
        const result = await validator.validate(data, model);

        expect(result.valid).toBe(true);
        expect(result.errorCount).toBe(0);
    });

    test('testAnonymousValidator', () => {
        expect(() => {
            Validator();
        }).not.toThrow();
    });
});
