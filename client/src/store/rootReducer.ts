import { combineReducers } from 'redux';

import journalEntryReducer from './journal-entry/journalEntryReducer';

const rootReducer = combineReducers({
  journalEntry: journalEntryReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
