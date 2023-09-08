// sequelize.ts
import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // Nama file SQLite
});

export default sequelize;
