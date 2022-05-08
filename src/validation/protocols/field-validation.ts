export interface FieldValidation {
  field: string;
  validate(value): Error;
}
