import mongoose, { Schema } from 'mongoose';

export interface User {
  _id?: string;
  last_name: string;
  first_name: string;
}

export var UserSchema = new Schema(
  {
    first_name: String,
    last_name: String,
  },
  { collection: 'users' }
);

export var UserMongoModel = mongoose.model('User', UserSchema);
