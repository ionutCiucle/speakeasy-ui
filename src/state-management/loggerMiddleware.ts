import { AppAction, AppState, AppReducer } from './store';

export function createLoggerReducer(reducer: AppReducer): AppReducer {
  return (state: AppState, action: AppAction): AppState => {
    const nextState = reducer(state, action);

    if (__DEV__) {
      console.group(
        `%c action %c${action.type}`,
        'color: gray; font-weight: lighter;',
        'color: black; font-weight: bold;',
      );
      console.log('%c prev state', 'color: #9E9E9E; font-weight: bold;', state);
      console.log(
        '%c action    ',
        'color: #03A9F4; font-weight: bold;',
        action,
      );
      console.log(
        '%c next state',
        'color: #4CAF50; font-weight: bold;',
        nextState,
      );
      console.groupEnd();
    }

    return nextState;
  };
}
