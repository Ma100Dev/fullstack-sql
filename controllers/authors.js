const router = require('express').Router()
require('express-async-errors')
const { Blog } = require('../models')
const sequelize = require('sequelize')

router.get('/', async (req, res) => {
    const authors = await Blog.findAll({
        attributes: [
            'author',
            [sequelize.fn('COUNT', sequelize.col('*')), 'blogs'],
            [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
        ],
        group: ['author'],
        order: [
            [sequelize.fn('SUM', sequelize.col('likes')), 'DESC']
        ]
    })
    res.json(authors)
})

module.exports = router