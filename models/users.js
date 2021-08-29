const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

var Users = sequelize.define('user',{
    uid:{
        type:Sequelize.STRING(40),
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    firstName:{
        type:Sequelize.STRING(100),
        allowNull:true,
    },
    lastName:{
        type:Sequelize.STRING(100),
        allowNull:true,
    },
    fullName:{
        type:Sequelize.STRING(100),
        allowNull:true,
    },
    userType:{
        type:Sequelize.STRING(100),
        allowNull:true,
    },
    isActive:{
        type:Sequelize.BOOLEAN,
        allowNull:true,
        defaultValue:true
    },
    phoneNo:{
        type:Sequelize.STRING(100),
        allowNull:true
    },
    password:{
        type:Sequelize.STRING(150),
        allowNull:true
    },
    status:{
        type:Sequelize.BOOLEAN,
        allowNull:true,
    }
});

module.exports= Users;