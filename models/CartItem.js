module.exports = (sequelize, Sequelize) => {
    const CartItem = sequelize.define('CartItem', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },
        unitPrice: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
        },
        productName: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
    }, 
    {
        timestamps: true
    });

    return CartItem;
}