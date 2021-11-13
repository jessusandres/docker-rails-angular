import { AppActions } from '../actions/app.actions';
import { AppTypes } from '../types/app.types';

import update from 'immutability-helper';

export interface AppState {
  count: number,
  users: any[],
  loading: boolean,
}

export const initialState: AppState = {
  count: 0,
  users: [],
  loading: false,
};

export const AppReducer = (state: AppState = initialState, action: AppActions) => {
  switch (action.type) {
    case AppTypes.INCREMENT:
      return update(state, {
        count: { $set: state.count + 1 },
      });
    case AppTypes.DECREMENT:
      return update(state, {
        count: { $set: state.count - 1 },
      });
    case AppTypes.RESET:
      return update(state, {
        count: { $set: 0 },
      });
    case AppTypes.GET_DATA:
    case AppTypes.GET_FAKE_DATA:
      return update(state, {
        loading: { $set: true },
      });
    case AppTypes.GET_DATA_SUCCESS:
    case AppTypes.GET_FAKE_DATA_SUCCESS:
      return update(state, {
        users: { $set: action.payload.users },
        loading: { $set: false },
      });
    case AppTypes.GET_DATA_FAIL:
      return update(state, {
        loading: { $set: false },
      });
    default:
      return state;
  }
};
