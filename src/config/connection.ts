import * as mongoose from 'mongoose';
import config from './env-configuration';

const connectOptions: {
  useCreateIndex: boolean;
  useUnifiedTopology: boolean;
  useNewUrlParser: boolean;
} = {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

const MONGO_URI = `${config.database.MONGODB_URI}${config.database.MONGODB_DB_MAIN}`;

const clientMongoDb: mongoose.Connection = mongoose.createConnection(MONGO_URI, connectOptions);

export default clientMongoDb;
