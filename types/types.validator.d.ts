declare module 'swagger-model-validator' {
    export interface ValidationResult {
        valid: boolean;
        errorCount: number;
        errors?: {
            name: string;
            message: string;
        }[];
        GetErrorMessages: () => string[];
        GetFormattedErrors: () => object[];
    }

    export interface SwaggerSpecification {
        components?: {
            schemas: any;
        };
        validateModel(
          modelName: string,
          object: object,
          allowBlankTarget?: boolean,
          disallowExtraProperties?: boolean
        ): Promise<ValidationResult>;
        addFieldValidatorToModel(model: string, fieldName: string, validatorFunction: Function): void;
        addFieldValidator(modelName: string, fieldName: string, validatorFunction: Function): void;
    }

    export interface CustomValidator {
        addFieldValidatorToModel(model: string, fieldName: string, validatorFunction: Function): void;
        addFieldValidator(modelName: string, fieldName: string, validatorFunction: Function): void;
        getFieldValidators(modelName: string, fieldName: string): Function[];
        validate(name: string, model: object, key: string, value: any): Promise<Error[] | null>;
    }

    export interface Merger {
        mergeModels(target: object, swaggerModel: object, swaggerModels: object): object;
        dereferenceModel(target: object, model: object, models: object, depth: number): object;
    }

    export interface ValueValidator {
        validateValue(key: string, value: any, field: object): Promise<Error[] | null>;
    }

    export default class Validator {
        customValidators: CustomValidator;
        merger: Merger;
        valueValidator: ValueValidator;
        swagger: SwaggerSpecification;

        constructor(swaggerSpec: SwaggerSpecification);

        validate(
          object: object,
          swaggerModel: string,
          swaggerModels: object,
          allowBlankTarget?: boolean,
          disallowExtraProperties?: boolean
        ): Promise<ValidationResult>;

        addFieldValidatorToModel(model: string, fieldName: string, validatorFunction: Function): void;
        addFieldValidator(modelName: string, fieldName: string, validatorFunction: Function): void;
        getFieldValidators(modelName: string, fieldName: string): Function[];
        getCustomValidator(): CustomValidator;
    }
}
