export enum JournalEntryActions {
  ACTION_ENTRIES_LOADED = 'entries/entriesLoaded',
  ACTION_ANSWER_CHANGED = 'entries/answerChanged',
}

export interface JournalEntryState {
  currentEntry?: IJournalEntry;
}

export interface IJournalEntry {
  _id?: string;
  date: Date;
  userId?: string;
  entries: IJournalEntryAnswers[];
}

export interface IJournalEntryAnswers {
  question: string;
  answers: string[];
}
