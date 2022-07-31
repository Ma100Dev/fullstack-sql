const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('reading_lists', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
                unique: true
            },
        })
        await queryInterface.createTable('reading_list_contents', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            blog_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'blogs', key: 'id' },
            },
            reading_list_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'reading_lists', key: 'id' },
            },
            read: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }

        })
    },
    down: async ({ context: queryInterface }) => {
        try {
            await queryInterface.removeConstraint('reading_list_contents', 'reading_list_contents_list_id_fkey')
            await queryInterface.removeConstraint('reading_lists', 'users_reading_list_id_fkey')
        } catch (e) { }
        await queryInterface.dropTable('reading_lists')
        await queryInterface.dropTable('reading_list_contents')
    },
}