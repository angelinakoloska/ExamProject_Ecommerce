module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('Product', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        active: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                isIn: {
                    args: [[1, 0]],
                    msg: "Active must be 1 0r 0"
                }
            }
        },
    }, 
    {
        timestamps: true
    });

    Product.associate = function (models) {
        Product.belongsTo(models.Category, { foreignKey: { allowNull: false }});
        Product.belongsTo(models.Brand, { foreignKey: { allowNull: false }});
    }
    return Product;
}