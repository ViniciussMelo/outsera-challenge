import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  storage: ':memory:',
  dialect: 'sqlite',
  logging: false,
});

const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('Conectado ao banco de dados em memória.');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

export { sequelize, connectDB };
