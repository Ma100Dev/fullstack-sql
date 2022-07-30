const router = require('express').Router()
const tokenExtractor = require('../middlewares/tokenExtractor')
const { Blog, User } = require('../models')
const { sequelize } = require('../util/db')
require('express-async-errors')
const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/', async (req, res) => {
    let title = req.query.title ? req.query.title.toLowerCase() : ''
    const blogs = await Blog.findAll({
        attributes: {
            exclude: ['userId']
        },
        include: {
            model: User, attributes: ['name']
        },
        where: {
            title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + title + '%')
        }
    })
    res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({ ...req.body, userId: user.id })
    res.json(blog)
})

router.delete('/:id', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    let blog = await Blog.findByPk(req.params.id)
    if (blog.userId !== user.id) {
        res.status(403).end()
    }
    blog = await Blog.destroy({
        where: {
            id: req.params.id
        }
    })
    res.json(blog)
})

router.put('/:id', blogFinder, async (req, res) => {
    if (req.blog) {
        req.blog.likes = req.body.likes
        await req.blog.save()
        res.json(req.blog)
    } else {
        res.status(404).end()
    }
})

module.exports = router