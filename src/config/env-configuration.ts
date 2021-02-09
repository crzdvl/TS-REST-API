import * as dotenv from 'dotenv';

dotenv.config();

const config: {
  port: string | number;
  database: {
    MONGODB_URI: string;
    MONGODB_DB_MAIN: string;
  };
  secret: string;
} = {
  port: process.env.PORT || 3000,
  database: {
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN,
  },
  secret: process.env.SECRET,
};

export default config;
