import { GetDataFailure, GetDataSuccess, GetFakeData, GetUsers, IncrementCounter } from '../actions/app.actions';

import { createReducer, on } from '@ngrx/store';

export interface AppState {
  count: number,
  users: any[],
  loading: boolean,
  error: Object | null,
}

export const initialState: AppState = {
  count: 0,
  users: [],
  loading: false,
  error: null,
};

export const AppReducer = createReducer(
  initialState,
  on(IncrementCounter, (state) => {
    return { ...state, count: state.count + 1 };
  }),
  on(GetFakeData, GetUsers, (state) => {
    return { ...state, loading: true };
  }),
  on(GetDataSuccess, (state, { payload: { users } }) => {
    return { ...state, loading: false, users };
  }),
  on(GetDataFailure, (state, { payload: { error } }) => {
    return { ...state, loading: false, error };
  }),
);
