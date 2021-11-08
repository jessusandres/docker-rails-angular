import { AppReducer, AppState } from './reducers/app.reducer';

export interface MainState {
  app: AppState
}

export const MainReducer = {
  app: AppReducer,
};
