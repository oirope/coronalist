const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

require('dotenv').config()

const app = express()
const port = process.env.PORT

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

const Item = require('./models/Item')

app.get('/', (req, res) => {
    const signedin = true
    Item.find()
        .sort({ _id: -1 })
        .then(items => res.render('index', { items, signedin }))
        .catch(err => res.status(404).json({ err }))
})

app.post('/item/add', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    })

    newItem.save().then(() => res.redirect('/'))
})

app.get('/item/:id/like', (req, res) => {
    Item.findById(req.params.id, 'likes', (err, item) => {
        if (err) console.log(err)
        res.send(`${item.likes}`)
    })
})

app.put('/item/:id/like', (req, res) => {
    Item.findOneAndUpdate({ _id: req.params.id }, { $inc: { likes: 1 } }, { useFindAndModify: false }, (err, item) => {
        if (err) console.log(err)
        console.log('clicked')
        res.json(item)
    })
})

const kill = async () => {
    await mongoose.connection.close()
    console.log('MongoDB Disconnected')
    await server.close()
    console.log('Server closed')
    process.exit(0)
}

process.on('SIGINT', kill)
process.on('exit', kill)

const server = app.listen(port, () => console.log('Server running...'))