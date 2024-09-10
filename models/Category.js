module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define('Category', {
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

    Category.associate = function(models) {
        Category.hasMany(models.Product, { foreignKey: 'categoryId'})
    };

    return Category;
}