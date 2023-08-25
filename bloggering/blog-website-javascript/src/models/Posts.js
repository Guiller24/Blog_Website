const { DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

const Posts = sequelize.define('Posts', {
    postId:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {type: DataTypes.INTEGER},
    title: {type: DataTypes.STRING, allownull: false},
    headline: {type: DataTypes.STRING},
    post: {type: DataTypes.STRING},
    author: {type: DataTypes.STRING},
    createdAt: {type: DataTypes.DATE},
    }, {
        timestamps: false,
        tableName: 'posts',
});

module.exports = Posts;