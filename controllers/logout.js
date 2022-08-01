const jwt = require('jsonwebtoken')
const router = require('express').Router()
require('express-async-errors')
const { SECRET } = require('../util/config')
const User = require('../models/user')
const { Token } = require('../models')
const tokenExtractor = require('../middlewares/tokenExtractor')

router.delete('/', tokenExtractor, async (request, response) => {
    const user = await User.findByPk(request.decodedToken.id)
    const result = await Token.destroy({
        where: { userId: user.id }
    })
    response
        .status(200)
        .json({ result })
})

module.exports = router