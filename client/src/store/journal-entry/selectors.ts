import { AppState } from '../rootReducer';

// selectors
export const getCurrentJournalEntry = (state: AppState) => state.journalEntry.currentEntry;
