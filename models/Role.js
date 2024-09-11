module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('Role', {
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
    }, {timestamps: true});
    Role.associate = function (models) {
      Role.hasMany(models.User, { foreignKey: {allowNull: false}});
    }
    return Role;
  }