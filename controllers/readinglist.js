const router = require('express').Router()
require('express-async-errors')
const { ReadingListContent, ReadingList } = require('../models')

router.post('/', async (req, res) => {
    const { userId, blogId } = req.body
    const readingListId = await ReadingList.findOne({
        where: {
            userId
        }
    })
    console.log(readingListId)
    const content = await ReadingListContent.create({ readingListId: readingListId.dataValues.id, blogId })
    res.json(content)
})

module.exports = router