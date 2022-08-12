const { DataTypes } = require('sequelize')

function initialize(sequelize) {
    const User = sequelize.define('User', {
        // Model attributes are defined here
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        propic: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "defaultAvatar.jpg"
        },
        cartItems: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        // Other model options go here
        timestamps: true,
        createdAt: 'date',
        updatedAt: false
    });
    /* const Product = require('./Product')(sequelize)
    const Review = require('./Review')(sequelize)
    const UserProduct = require('./UserProduct')(sequelize)
    const Likes = require('./Likes')(sequelize)
    const Layout = require('./Layout')(sequelize) */

    return User
}

module.exports = initialize