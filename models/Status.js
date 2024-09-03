module.exports = (sequelize, Sequelize) => {
    const Status = sequelize.define('Status', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.DataTypes.STRING,
            defaultValue: 'Ordered',
            validate: {
                isIn: {
                    args: [['Ordered', 'In Progress', 'Completed']],
                    msg: "Status must be 'Ordered', 'In Progress' or 'Completed'"
                }
            }
        }
    }, {
        timestamps: true
    });

    Status.associate = function(models) {
        Status.hasMany(models.Order, { foreignKey: {allowNull: false }});
    };

    return Status;
}