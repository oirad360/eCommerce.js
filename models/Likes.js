const { DataTypes } = require('sequelize')

function initialize(sequelize) {
    const Likes = sequelize.define('Like', {}, {
        // Other model options go here
        timestamps: false
    });
    return Likes
}

module.exports = initialize