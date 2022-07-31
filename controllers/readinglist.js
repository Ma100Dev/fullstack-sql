const router = require('express').Router()
require('express-async-errors')
const tokenExtractor = require('../middlewares/tokenExtractor')
const { ReadingListContent, ReadingList, User } = require('../models')

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

router.put('/:id',tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    const content = await ReadingListContent.findByPk(req.params.id)
    const readingListId = await ReadingList.findOne({
        where: {
            userId: user.id
        }
    })
    if (content.readingListId !== readingListId.dataValues.id) {
        res.status(403).end()
    }
    const updatedContent = await ReadingListContent.update({
        read: req.body.read
    }, {
        where: {
            id: req.params.id
        }
    })
    res.json(updatedContent)
})


module.exports = router