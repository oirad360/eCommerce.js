const config = require('./config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const models = {}
module.exports = {
    initialize,
    models
}

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    const res = await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.end()
    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return
    }
    // init models and add them to the exported db object
    const User = require('./models/User')(sequelize)
    const Product = require('./models/Product')(sequelize)
    const Layout = require('./models/Layout')(sequelize)
    const Review = require('./models/Review')(sequelize)
    const ProductsLocation = require('./models/ProductsLocation')(sequelize)
    const Likes = require('./models/Likes')(sequelize)
    const UserProduct = require('./models/UserProduct')(sequelize)

    User.hasMany(Product)
    User.hasMany(Review)
    User.belongsToMany(Product, { through: UserProduct, as: 'userProducts' })
    User.belongsToMany(Review, { through: Likes, as: 'likedReviews' })
    User.hasMany(Layout)

    Product.belongsTo(User, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    Product.hasMany(Review)
    Product.belongsToMany(User, {
        through: UserProduct,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        as: 'userProducts'
    })
    Product.hasMany(ProductsLocation)

    Review.belongsTo(Product, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    Review.belongsTo(User, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    Review.belongsToMany(User, {
        through: Likes,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        as: 'likedUser'
    })

    Layout.belongsTo(User, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    Layout.hasMany(ProductsLocation)

    ProductsLocation.belongsTo(Layout, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    ProductsLocation.belongsTo(Product, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })

    models.User = User
    models.Product = Product
    models.Layout = Layout
    models.Review = Review
    models.ProductsLocation = ProductsLocation
    models.Likes = Likes
    models.UserProduct = UserProduct

    // sync all models with database
    await sequelize.sync()
    if (res[0].affectedRows === 1 && res[0].warningStatus === 0) {
        //const connection = await mysql.createConnection({ host, port, user, password, database });
        await sequelize.query(
            "create trigger user_cart_on_update\n" +
            "before update on user_product\n" +
            "for each row\n" +
            "begin\n" +
            "IF old.cart<new.cart THEN\n" +
            "update users set cartItems=cartItems+(new.cart-old.cart) where id=new.userId;\n" +
            "ELSEIF old.cart>new.cart THEN\n" +
            "update users set cartItems=cartItems-(old.cart-new.cart) where id=new.userId;\n" +
            "END IF;\n" +
            "IF new.cart<0 THEN\n" +
            "signal sqlstate '45000' set message_text='Il carrello non può essere negativo';\n" +
            "END IF;\n" +
            "end"
        )
        await sequelize.query(
            'create trigger user_cart_on_insert\n' +
            'before insert on user_product\n' +
            'for each row\n' +
            'begin\n' +
            'IF new.cart > 0 THEN\n' +
            'update users set cartItems = cartItems + (new.cart) where id = new.userId;\n' +
            'END IF;\n' +
            'end'
        )
        await sequelize.query(
            'create trigger new_like\n' +
            'before insert on likes\n' +
            'for each row\n' +
            'begin\n' +
            'update reviews set likes=likes+1 where id=new.reviewId;\n' +
            'end'
        )
        await sequelize.query(
            'create trigger delete_like\n' +
            'before delete on likes\n' +
            'for each row\n' +
            'begin\n' +
            'update reviews set likes=likes-1 where id=old.reviewId;\n' +
            'end'
        )
    }
}

/* function initSequelize() {
    console.log("---------------INITIALIZING SEQUELIZE-----------------")
    const { user, password, database } = config.database;
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });
    console.log("---------------SEQUELIZE INITIALIZATED-----------------")
    return sequelize
} */