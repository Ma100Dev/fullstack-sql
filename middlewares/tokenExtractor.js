const jwt = require('jsonwebtoken')
const { SECRET } = require('../util/config')
const { Token, User } = require('../models')

const tokenExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            console.log(authorization.substring(7))
            const decodedToken = jwt.verify(authorization.substring(7), SECRET)
            const token = await Token.findOne({
                where: {
                    userId: decodedToken.id
                }
            })
            if (token && token.token === authorization.substring(7)) {
                const user = await User.findByPk(decodedToken.id)
                console.log(user, user.dataValues.disabled, user.disabled)
                if (user.dataValues.disabled) {
                    res.status(401).json({ error: 'User is disabled' })
                } else {
                    req.decodedToken = decodedToken
                }
            } else {
                throw new Error()
            }
        } catch (error) {
            console.log(error)
            return res.status(401).json({ error: 'token invalid' })
        }
    } else {
        return res.status(401).json({ error: 'token missing' })
    }
    next()
}

module.exports = tokenExtractor