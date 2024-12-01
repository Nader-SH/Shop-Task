import sequelize from '../database/config/connection';
import Products from './products';
import Users from './users';


Users.hasMany(Products, { foreignKey: 'userId' });
Products.belongsTo(Users, { foreignKey: 'userId' });


export {
    Users,
    Products,
    sequelize
}