module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define('Cart', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            // unique: true
        },
        active: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                isIn: {
                    args: [[1, 0]],
                    msg: "Active must be 1 or 0"
                }
            }
        }
    }, 
    {
        timestamps: true
    });

    Cart.associate = function(models) {
        Cart.belongsToMany(models.Product, { through: 'CartItem', allowNull: false});
        Cart.belongsTo(models.User, { allowNull: false });
    };

    return Cart;
}