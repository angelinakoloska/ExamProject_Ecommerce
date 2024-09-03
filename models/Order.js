module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define('Order', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.DataTypes.STRING
        },
        orderNumber: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        membershipId: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        }
    }, 
    {
        timestamps: true
    });

    Order.associate = function(models) {
        Order.belongsToMany(models.Product, { through: 'OrderItem', allowNull: false });
        Order.belongsTo(models.User, { allowNull: false });
        Order.belongsTo(models.Status, { foreignKey: { allowNull: false }});
    };

    return Order;
}