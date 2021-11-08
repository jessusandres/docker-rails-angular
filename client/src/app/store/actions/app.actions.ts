import { createAction, props } from '@ngrx/store';
import { AppTypes } from '../types/app.types';

export const IncrementCounter = createAction(AppTypes.INCREMENT);

export const GetFakeData = createAction(AppTypes.GET_FAKE_DATA);
export const GetUsers = createAction(AppTypes.GET_DATA);

export const GetDataSuccess = createAction(
  AppTypes.GET_DATA_SUCCESS,
  props<{ payload: { users: any[] } }>(),
);

export const GetDataFailure = createAction(
  AppTypes.GET_DATA_FAIL,
  props<{ payload: { error: Object } }>(),
);
