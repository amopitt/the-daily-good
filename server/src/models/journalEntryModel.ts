import mongoose, { Schema } from 'mongoose';

export interface JournalEntry {
  _id?: string;
  userId?: string;
  date: string;
  entries: any[];
}

export var JournalEntrySchema = new Schema(
  {
    date: Date,
    userId: String,
    entries: Array,
  },
  { collection: 'JournalEntry' }
);

export var JournalEntryMongoModel = mongoose.model('JournalEntry', JournalEntrySchema);
