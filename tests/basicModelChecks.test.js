const Validator = require('../lib/modelValidator');
const { beforeEach, describe, test, expect } = require('@jest/globals');
let validator;

beforeEach(() => {
    validator = new Validator();
});
describe('validationTests', () => {

    test('noModelTest', async () => {
        const data = {
            id: 1,
            data: 'Test Data'
        };
        const errors = await validator.validate(data);

        expect(errors.valid).toBe(false);
        expect(errors.errorCount).toBe(1);
    });

    test('noDataTest', async () => {
        const errors = await validator.validate();

        expect(errors.valid).toBe(false);
        expect(errors.errorCount).toBe(1);
    });

    test('noDataByModelTest', async () => {
        const model = {
            description: 'Woah'
        };

        const errors = await validator.validate(null, model);

        expect(errors.valid).toBe(false);
        expect(errors.errorCount).toBe(1);
    });

    test('EmptyStringByModelTest', async () => {
        const model = {
            description: 'Woah'
        };

        const errors = await validator.validate("", model);

        expect(errors.valid).toBe(false);
        expect(errors.errorCount).toBe(1);
    });

    test('emptyDataModelFailsTest', async () => {
        const model = {
            description: 'Woah'
        };

        const errors = await validator.validate({}, model);

        expect(errors.valid).toBe(false);
        expect(errors.errorCount).toBe(1);
    });

    test('emptyDataModelTest', async () => {
        const model = {
            description: 'Woah'
        };

        const errors = await validator.validate({}, model, true);

        expect(errors.valid).toBe(true);
    });

    test('emptyDataModelFailsCheckMessageArrayTest', async () => {
        const model = {
            description: 'Woah'
        };

        const errors = await validator.validate({}, model);

        expect(errors.valid).toBe(false);
        expect(errors.errorCount).toBe(1);
        expect(errors.GetErrorMessages().length).toBe(1);
        expect(errors.GetFormattedErrors().length).toBe(1);
    });

});
