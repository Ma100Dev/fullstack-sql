const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('tokens', {
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
        })
        await queryInterface.addColumn('tokens', 'user_id', {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: { model: 'users', key: 'id' },
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('tokens')
    },
}   