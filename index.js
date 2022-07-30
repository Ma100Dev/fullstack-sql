require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json({ type: '*/*' }));

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
})

class Blog extends Model { }
Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        author:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName:
            "blog",
    }
)
Blog.sync()

app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

app.post('/api/blogs', async (req, res) => {
    try {
        const blog = await Blog.create(req.body)
        res.json(blog)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

app.delete('/api/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json(blog)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })