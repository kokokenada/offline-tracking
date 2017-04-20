import { ActionReducer, Action } from '@ngrx/store';

export const NAVIGATE = 'NAVIGATE';

export function navigateReducer(state: string = "", action: Action) {
  switch (action.type) {
    case NAVIGATE:
      return action.payload;

    default:
      return state;
  }
}
