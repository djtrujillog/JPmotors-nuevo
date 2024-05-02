import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('jpmotors_bd', 'jpmotors_dtrujillo', 'Sopadepollo2024.', {
  host: '65.109.88.87',
  dialect: 'mysql'
});

export default sequelize;