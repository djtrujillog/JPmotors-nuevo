import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('jpmotors_bd', 'jpmotors_dtrujillo', 'Sopadepollo2024.', {
  host: '94.130.216.164',
  dialect: 'mysql'
});

export default sequelize;