const jwt = require('jsonwebtoken')
const router = require('express').Router()
require('express-async-errors')
const { SECRET } = require('../util/config')
const User = require('../models/user')
const { Token } = require('../models')

router.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findOne({
        where: {
            username: body.username
        }
    })

    const passwordCorrect = body.password === 'salainen'

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id,
    }

    const token = jwt.sign(userForToken, SECRET)

    await Token.destroy({
        where: {userId: userForToken.id}
    })
    await Token.create({
        token,
        userId: userForToken.id
    })

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = router