// src/models/BaseModel.ts

import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidatorOptions } from "class-validator";

/**
 * Abstract class representing the base model.
 */
export abstract class BaseModel {
  constructor(partial?: Partial<any>) {
    Object.assign(this, partial);
  }

  /**
   * Deserialize plain object to class instance with validation.
   */
  static async fromPlain<T extends BaseModel>(
    this: new (partial?: Partial<T>) => T,
    plain: object,
    validatorOptions?: ValidatorOptions
  ): Promise<T> {
    const instance = plainToInstance(this, plain, {
      excludeExtraneousValues: true,
    });
    await validateOrReject(instance, { whitelist: true, ...validatorOptions });
    return instance;
  }

  /**
   * Serialize class instance to JSON.
   */
  toJSON(): any {
    return JSON.parse(JSON.stringify(this));
  }
}
