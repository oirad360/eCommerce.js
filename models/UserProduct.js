const { DataTypes } = require('sequelize')

function initialize(sequelize) {
    const UserProduct = sequelize.define('UserProduct', {
        // Model attributes are defined here
        wishlist: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        cart: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        bought: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        // Other model options go here
        timestamps: false,
        tableName: 'user_product'
    });
    return UserProduct
}

module.exports = initialize