import express, { Express } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import cors from 'cors';
import fs from 'fs';

import routes from './routes';
import db from './models';
import { initExtension } from './controllers/init/initController';

const app: Express = express();
dotenv.config();

app.use(cors({ origin: true, credentials: true }));
app.use('/upload', express.static('upload'));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: false }));

const connectToDB = async () => {
  try {
    await db.sequelize.sync({ force: false });
    if (!fs.existsSync('./upload/'))
      fs.mkdirSync('./upload/', { recursive: true });
    await initExtension();
  } catch (error) {
    console.log(error);
  }
};

connectToDB();

app.use('/api', routes);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', async function (req, res) {
  const response1 = await axios.get('http://localhost:8081/api/fixed/');
  const allFixedExtension = response1.data;
  const response2 = await axios.get('http://localhost:8081/api/custom/');
  const allCustomExtension = response2.data;
  res.render('main.ejs', { allFixedExtension, allCustomExtension });
});

app.listen(8081, () => {
  console.log('Server Opened');
});
