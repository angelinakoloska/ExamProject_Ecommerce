module.exports = (sequelize, Sequelize) => {
    const Membership = sequelize.define('Membership', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.DataTypes.STRING,
            // allowNull: false,
            defaultValue: "Bronze",
            validate: {
                isIn: {
                    args: [['Bronze', 'Silver', 'Gold']],
                    msg: "Membership must be 'Bronze', 'Silver' or 'Gold'"
                }
            }
        }
    }, 
    {
        timestamps: true
    });

    return Membership;
}