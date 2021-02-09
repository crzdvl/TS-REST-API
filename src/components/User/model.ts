import { Document, Schema } from 'mongoose';

import clientMongoDb from '../../config/connection';

export interface IUserModel extends Document {
  _id: string;
  id_type: string;
  password: string;
  token: string;
}

const UserSchema: Schema = new Schema({
  _id: String,
  id_type: String,
  password: String,
  token: String,
}, {
  collection: 'users',
  versionKey: false,
});

export default clientMongoDb.model<IUserModel>('UserModel', UserSchema);
