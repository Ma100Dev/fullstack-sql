const Blog = require('./blog')
const User = require('./user')
const ReadingListContent = require('./readingListContent')
const ReadingList = require('./readingList')
const Token = require('./token')

User.hasMany(Blog)
Blog.belongsTo(User)

User.hasOne(ReadingList)
ReadingList.belongsTo(User)
ReadingList.hasMany(ReadingListContent)
Blog.belongsToMany(ReadingList, { through: ReadingListContent })
ReadingList.belongsToMany(Blog, { through: ReadingListContent })
ReadingListContent.belongsTo(ReadingList)

User.hasOne(Token)

module.exports = {
    Blog, User, ReadingListContent, ReadingList, Token
} 
