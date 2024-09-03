module.exports = (sequelize, Sequelize) => {
    const OrderItem = sequelize.define('OrderItem', {
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

    return OrderItem;
}