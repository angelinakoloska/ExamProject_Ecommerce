module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        telephoneNumber: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        encryptedPassword: {
            type: Sequelize.DataTypes.BLOB,
            allowNull: false
        },
        salt: {
            type: Sequelize.DataTypes.BLOB,
            allowNull: false
        },
        purchases: {
            type: Sequelize.DataTypes.INTEGER,
            default: 0,
            allowNull: false
        }
    }, {
        timestamps: true
    });

    User.associate = function(models) {
        User.belongsTo(models.Membership, { foreignKey: {allowNull: false }});
        User.belongsTo(models.Role, { foreignKey: {allowNull: false }});
    }

    return User;
}