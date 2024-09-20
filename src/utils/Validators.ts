// src/utils/Validators.ts
import { validate, ValidationError } from 'class-validator';

export async function validateModel<T>(model: T): Promise<ValidationError[]> {
  return await validate(model as any);
}
