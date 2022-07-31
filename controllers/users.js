const router = require('express').Router()
require('express-async-errors')
const sequelize = require('sequelize')
const { User, Blog, ReadingList, ReadingListContent } = require('../models')

router.get('/', async (req, res) => {
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: { exclude: ['userId'] }
        },
    })
    res.json(users)
})

router.get('/:id', async (req, res) => {
    let filter
    let filterIsNullOrUndefined = false
    if (req.query.read === 'true') {
        filter = true
    } else if (req.query.read === 'false') {
        filter = false
    } else {
        filterIsNullOrUndefined = true
    }
    const user = (await User.findByPk(req.params.id)).dataValues
    const reads = await ReadingList.findAll({
        where: [
            { user_id: req.params.id },
            filterIsNullOrUndefined ? null : sequelize.literal('"blogs->readingListContent"."read" = ' + filter)
        ],
        include: {
            model: ReadingListContent,
            model: Blog,
        }
    })
    res.json({ ...user, reads: reads[0].blogs })
    res.status(500).end()
})

router.post('/', async (req, res) => {
    let user;
    try {
        user = await User.create(req.body)
    } catch (err) {
        console.log(err)
        res.status(400).end()
    }
    await ReadingList.create({ userId: user.id })
    res.json(user)
})

router.put('/:username', async (req, res) => {
    const user = await User.findOne({ where: { username: req.params.username } })
    if (user) {
        user.name = req.body.name
        await user.save()
        res.json(user)
    } else {
        res.status(404).end()
    }
})

router.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        include: {
            model: Blog,
            attributes: { exclude: ['userId'] }
        }
    })
    if (user) {
        res.json(user)
    }
    res.status(404).end()
})

module.exports = router