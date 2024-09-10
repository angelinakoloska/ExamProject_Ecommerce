module.exports = (sequelize, Sequelize) => {
    const Brand = sequelize.define('Brand', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, 
    {
        timestamps: true
    });

    Brand.associate = function (models) {
        Brand.hasMany(models.Product, {foreignKey: 'brandId'});
      }

    return Brand;
}