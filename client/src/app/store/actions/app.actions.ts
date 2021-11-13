import { Action } from '@ngrx/store';
import { AppTypes } from '../types/app.types';

export class CounterIncrementAction implements Action {
  readonly type = AppTypes.INCREMENT;
}

export class CounterDecrementAction implements Action {
  readonly type = AppTypes.DECREMENT;
}

export class CounterResetAction implements Action {
  readonly type = AppTypes.RESET;
}

export class GetStateFromApiAction implements Action {
  readonly type = AppTypes.GET_DATA;
}

export class GetStateFromApiSuccessAction implements Action {
  readonly type = AppTypes.GET_DATA_SUCCESS;

  constructor(public payload: { users: any[] }) {
    console.log({ payload })
  }
}

export class GetFakeData implements Action {
  readonly type = AppTypes.GET_FAKE_DATA;
}

export class GetFakeDataSuccess implements Action {
  readonly type = AppTypes.GET_FAKE_DATA_SUCCESS;

  constructor(public payload: { users: any[] }) {
    console.log({ payload })
  }
}

export class GetStateFromApiFailAction implements Action {
  readonly type = AppTypes.GET_DATA_FAIL;

  constructor(public payload: any) {
  }
}

export type AppActions =
  CounterDecrementAction |
  CounterIncrementAction |
  CounterResetAction |
  GetStateFromApiAction |
  GetStateFromApiSuccessAction |
  GetStateFromApiFailAction |
  GetFakeData |
  GetFakeDataSuccess;
