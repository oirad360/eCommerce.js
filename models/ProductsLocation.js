const { DataTypes } = require('sequelize')


function initialize(sequelize) {
    const ProductsLocation = sequelize.define('ProductsLocation', {
        // Model attributes are defined here
        dataGen: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dataId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        // Other model options go here
        timestamps: false,
        tableName: "products_locations"
    });
    /* const Layout = require('./Layout')(sequelize)
    const Product = require('./Product')(sequelize) */

    return ProductsLocation
}

module.exports = initialize