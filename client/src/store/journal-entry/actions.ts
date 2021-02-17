import { ActionType } from '..';
import { IJournalEntry, JournalEntryActions } from './types';

export const journalEntriesLoaded = (journalEntries: IJournalEntry): ActionType<IJournalEntry> => {
  return {
    type: JournalEntryActions.ACTION_ENTRIES_LOADED,
    payload: journalEntries,
  };
};

export const answerChanged = (newAnswer: string, questionIndex: number, answerIndex: number): ActionType<any> => {
  return {
    type: JournalEntryActions.ACTION_ANSWER_CHANGED,
    payload: {
      newAnswer,
      questionIndex,
      answerIndex,
    },
  };
};
