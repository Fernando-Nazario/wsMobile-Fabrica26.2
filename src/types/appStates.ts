import { Subject } from "./subject";
import { User } from "./user";

export enum States {
    INITIAL,
    LOADING,
    SUCCESS,
    ERROR
}

export interface AppStateIdle {
  status: States.INITIAL;
}

export interface AppStateLoading {
  status: States.LOADING;
}

export interface AppStateSuccess {
  status: States.SUCCESS;
  data: User | Subject | Subject[];
}

export interface AppStateError {
  status: States.ERROR;
  message: string;
}

export type AppState = AppStateIdle | AppStateLoading | AppStateSuccess | AppStateError;