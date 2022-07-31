const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class ReadingListContent extends Model { }

ReadingListContent.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' },
    },
    readingListId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'reading_lists', key: 'id' },
    },
    read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'readingListContent'
})

module.exports = ReadingListContent