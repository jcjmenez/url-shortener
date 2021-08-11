const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

let urls = [
    {
        id: 0,
        longUrl: "https://www.youtube.com/",
        shortUrl: "test"
    },
    {
        id: 1,
        longUrl: "https://stackoverflow.com/",
        shortUrl: "test2"
    }
]

app.get('/', (req, res) => {
    res.send('<h1>URLS API</h1>')
})

app.get('/api/urls', (req, res) => {
    res.json(urls)
})

app.post('/api/urls', (req, res) => {
    const url = req.body
    urls = [...urls, url]
    console.log(urls)
    res.json(url)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)