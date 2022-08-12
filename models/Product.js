const { DataTypes } = require('sequelize')

function initialize(sequelize) {
    const Product = sequelize.define('Product', {
        // Model attributes are defined here
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "defaultProduct.jpg"
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        producer: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        // Other model options go here
        timestamps: true,
        createdAt: 'date',
        updatedAt: false
    });
    /* const User = require('./User')(sequelize)
    const Review = require('./Review')(sequelize)
    const UserProduct = require('./UserProduct')(sequelize)
    const ProductsLocation = require('./ProductsLocation')(sequelize) */

    return Product
}

/* function association(sequelize) {
    Product.belongsTo(sequelize.models.user, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
} */

module.exports = initialize