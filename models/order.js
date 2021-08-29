const sequelize =  require('../utils/database');
const Sequelize = require('sequelize');

const Orders = sequelize.define('order',{
    uid:{
        type:Sequelize.STRING(30),
        primaryKey:true,
        allowNull:false
    },
    quantity:{
        type:Sequelize.INTEGER,
        allowNull:false,
        defaultValue:1
    },
    isActive:{
        type:Sequelize.BOOLEAN,
        allowNull:true,
        defaultValue:true
    },
    orderDelivered:{
        type:Sequelize.BOOLEAN,
        allowNull:true,
    },
    orderCancelled:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false
    },
    deliveryPersonId:{
        type:Sequelize.STRING(30),
        allowNull:true
    },
    Reached_Store:{
        type:Sequelize.BOOLEAN,
        allowNull:true,
        defaultValue:null
    },
    Items_Picked:{
        type:Sequelize.BOOLEAN,
        allowNull:true,
        defaultValue:null
    },
    Enroute:{
        type:Sequelize.BOOLEAN,
        allowNull:true,
        defaultValue:null
    }
});

module.exports = Orders;