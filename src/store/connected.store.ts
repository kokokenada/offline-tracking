import { ActionReducer, Action } from '@ngrx/store';

export const CONNECT = 'CONNECT';
export const DISCONNECT = 'DISCONNECT';

export function connectReducer(state: boolean = false, action: Action) {
  switch (action.type) {
    case CONNECT:
      return true;

    case DISCONNECT:
      return false;

    default:
      return state;
  }
}
