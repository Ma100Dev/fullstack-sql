const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Token extends Model { }
Token.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        token: {
            type: DataTypes.TEXT,
            unique: true,
            allowNull: false,
        },
        userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: 'users', key: 'id' }
       }
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName:
            "token",
    }
)

module.exports = Token