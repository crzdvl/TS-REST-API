import { Document, Schema } from 'mongoose';

import clientMongoDb from '../../config/connection';

export interface ITokenModel extends Document {
  user_id: string;
  token: string;
  time: Date;
}

const TokenSchema: Schema = new Schema({
  user_id: String,
  token: String,
  time: {
    type: Date,
    default: Date.now,
    index: { expires: 600 },
  },
}, {
  collection: 'tokens',
  versionKey: false,
});

export default clientMongoDb.model<ITokenModel>('TokenModel', TokenSchema);
