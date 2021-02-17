import { ActionType } from '..';
import { AppState } from '../rootReducer';
import { JournalEntryActions, JournalEntryState } from './types';

const initialState: JournalEntryState = {};

export default function entriesReducer(state = initialState, action: ActionType<any>): JournalEntryState {
  switch (action.type) {
    case JournalEntryActions.ACTION_ENTRIES_LOADED: {
      return { ...state, currentEntry: action.payload };
    }
    case JournalEntryActions.ACTION_ANSWER_CHANGED: {
      console.log('state', state);
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
