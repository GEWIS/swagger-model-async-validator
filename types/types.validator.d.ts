declare module 'swagger-model-validator' {
    export interface ValidationResult {
        valid: boolean;
        errorCount: number;
        errors?: {
            name: string;
            message: string
        }[],
        GetErrorMessages: () => string[],
        GetFormattedErrors: () => object[]
    }

    export interface SwaggerSpecification {
        definitions: any;
        validateModel(
            modelName: string,
            object: object,
            allowBlankTarget?: boolean,
            disallowExtraProperties?: boolean
        ): Promise<ValidationResult>;
    }

    export default class Validator {
        constructor(swaggerSpec: object);

        validate(
            object: object,
            swaggerModel: string,
            swaggerModels: object,
            allowBlankTarget?: boolean,
            disallowExtraProperties?: boolean
        ): Promise<ValidationResult>;

        addFieldValidator<T>(
            modelName: string,
            fieldName: string,
            validator: (name: string, value: T) => Promise<Error | Error[] | null>,
        ): null;
    }
}
