// define a model for the Artist table using sequelize

module.exports = (sequelize, DataTypes) => {
    sequelize.define('Artist', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        id: {
            type: DataTypes.INTEGER, // todo: changes it to use UUID
            primaryKey: true,
            autoIncrement: true
        },
        // ... other fields
    });
};