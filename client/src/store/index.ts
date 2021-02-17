import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer, { AppState } from './rootReducer';

const composedEnhancer = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
  // other store enhancers if any
);

const store = createStore(rootReducer, composedEnhancer);

const state = (): AppState => {
  return store.getState();
};

export interface IAction {
  type: string;
  payload: any;
}

export interface ActionType<T> {
  type: string;
  payload?: T;
}

export { store, state };
