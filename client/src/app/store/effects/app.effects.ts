import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../../services/users.service';
import { AppTypes } from '../types/app.types';
// import { catchError, mergeMap } from "rxjs/internal/operators";
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GetDataFailure, GetDataSuccess } from '../actions/app.actions';

@Injectable()
export class AppEffects {
  constructor(
    @Inject(Actions) private actions$: Actions,
    @Inject(UsersService) private usersService: UsersService,
  ) {
  }

  loadData$ = createEffect(() => this.actions$.pipe(
    ofType(AppTypes.GET_DATA),
    mergeMap(() => {
      return this.usersService.getApiUsers()
        .pipe(
          map((response) => GetDataSuccess({ payload: { users: response } })),
          catchError((err) => of(GetDataFailure({ payload: { error: err } }))),
        );
    }),
  ));

  loadFakeData$ = createEffect(() => this.actions$.pipe(
    ofType(AppTypes.GET_FAKE_DATA),
    mergeMap(() => {
      return this.usersService.getFakeUsers()
        .pipe(
          map((response) => GetDataSuccess({ payload: { users: response } })),
          catchError((err) => of(GetDataFailure({ payload: { error: err } }))),
        );
    }),
  ));

}
