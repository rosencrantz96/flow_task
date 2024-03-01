import { Sequelize } from 'sequelize';
import Config from '../config/config.js';

import FixedExtension from './fixedExtension';
import CustomExtension from './customExtension';

const env = process.env.NODE_ENV || 'development';
const config = Config[env];
const db: any = {
  FixedExtension,
  CustomExtension,
};

let sequelize: any = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.fixedExtension = FixedExtension.initModel(sequelize);
db.customExtension = CustomExtension.initModel(sequelize);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
