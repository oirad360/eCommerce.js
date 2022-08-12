const { DataTypes } = require('sequelize')


function initialize(sequelize) {
    const Review = sequelize.define('Review', {
        // Model attributes are defined here
        text: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stars: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 0
        }
    }, {
        // Other model options go here
        timestamps: true,
        createdAt: 'date',
        updatedAt: false
    });
    /* const Product = require('./Product')(sequelize)
    const User = require('./User')(sequelize)
    const Likes = require('./Likes')(sequelize) */

    return Review
}

module.exports = initialize