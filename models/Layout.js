const { DataTypes } = require('sequelize')


function initialize(sequelize) {
    const Layout = sequelize.define('Layout', {
        // Model attributes are defined here
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        mobile: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        // Other model options go here
        timestamps: false
    });
    /* const User = require('./User')(sequelize)
    const ProductsLocation = require('./ProductsLocation')(sequelize) */


    return Layout
}

module.exports = initialize