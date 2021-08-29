const sequelize = require('../utils/database');
const Sequelize = require('sequelize');

const Items = sequelize.define('item',{
    uid:{
        type:Sequelize.STRING(30),
        primaryKey:true,
        allowNull:false,
    },
    name:{
        type:Sequelize.STRING(50),
        allowNull:true,
    },
    isActive:{
        type:Sequelize.BOOLEAN,
        defaultValue:true
    }
});

module.exports = Items;