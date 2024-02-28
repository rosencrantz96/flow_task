import express, { Express } from 'express';
import dotenv from 'dotenv';

import routes from './routes';
import db from './models';

const app: Express = express();
dotenv.config();

const connectToDB = async () => {
  try {
    await db.sequelize.sync({ force: false });
  } catch (error) {
    console.log(error);
  }
};

connectToDB();

app.use('/api', routes);

app.listen(8081, () => {
  console.log('Server Opened');
});
