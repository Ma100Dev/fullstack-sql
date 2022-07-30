const router = require('express').Router()
require('express-async-errors')
const { User } = require('../models')

router.get('/', async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

router.post('/', async (req, res) => {
    const user = await User.create(req.body)
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

module.exports = router