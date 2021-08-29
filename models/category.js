const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Categories = sequelize.define('category',{
    uid:{
        type:Sequelize.STRING(30),
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    name:{
        type:Sequelize.STRING(70),
        allowNull:true,
    },
    isActive:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:true
    },
    address:{
        type:Sequelize.JSONB,
        allowNull:true
    }
});
module.exports = Categories;