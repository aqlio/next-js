import { IClass } from "./IClass";

export interface IClassState {
  classes: IClass[];
  isLoading: boolean;
  error: string | null;
}
