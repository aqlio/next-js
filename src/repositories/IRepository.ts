// src/repositories/IRepository.ts

export interface IRepository<T> {
  create(data: Partial<T>): Promise<T>;
  getById(id: string): Promise<T>;
  getAll(params?: Record<string, any>): Promise<T[]>;
  update(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
}
