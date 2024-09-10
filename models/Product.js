module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('Product', {
      productId: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      unitprice: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      discount: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      date_added: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      imgurl: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      quantity: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      brandId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      categoryId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      isdeleted: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, {timestamps: true});
    Product.associate = function (models) {
      Product.belongsTo(models.Category, { foreignKey: 'categoryId'});
      Product.belongsTo(models.Brand, { foreignKey: 'brandId',});
      Product.hasMany(models.CartItem, { foreignKey: 'productId'})
      Product.hasMany(models.OrderItem, { foreignKey: 'productId'});
    }
    return Product;
  }