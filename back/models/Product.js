const db = require("../db");
const S = require("sequelize");

class Product extends S.Model {};

Product.init({
    name: {
        type: S.STRING, 
        allowNull: false
    },
    description: {
        type: S.TEXT, 
        allowNull: false
    },
    price: {
        type: S.FLOAT,
        defaultValue: 0, 
        validate: {
            min:0
        }
    },
    stock: {
        type: S.INTEGER, 
        defaultValue: 0, 
        validate: {
            min:0
        }
    },
    active: {
        type: S.BOOLEAN,
        defaultValue: true,
    },
    url: {
        type: S.STRING, 
        allowNull: false
    },
}, {sequelize: db, modelName: "product"});


module.exports = Product;
