const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Users = sequelize.define('Users', {
    userId:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {type: DataTypes.STRING, allownull: false},
    lastName: {type: DataTypes.STRING, allownull: false},
    email: {type: DataTypes.STRING, allownull: false, unique: true},
    contactNum: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING}
}, {
    timestamps: false,
    tableName: 'users',
});

module.exports = Users;
