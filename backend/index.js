const express = require('express')
const cors = require('cors')
const app = express()
const { customAlphabet } = require('nanoid/non-secure')

app.use(cors())
app.use(express.json())

let urls = [
    {
        id: 0,
        longUrl: "https://www.youtube.com/",
        shortUrl: "aaaaaaa"
    },
    {
        id: 1,
        longUrl: "https://stackoverflow.com/",
        shortUrl: "bbbbbbb"
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
    if (!url || !url.longUrl) {
        res.status(400).json({
            error: 'Long url is missing'
        })
    }
    const ids = urls.map((url) => url.id);
    const maxId = ids.length > 0
    ? Math.max(...ids)
    : 0;
    const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 7)
    const urlToAdd = {
        id: maxId + 1,
        longUrl: url.longUrl,
        shortUrl: nanoid()
    }
    urls = [...urls, urlToAdd]
    console.log(urls)
    res.status(201).json(urlToAdd)
})

app.get('/:url', (req, res) => {
    const shortUrl = req.params.url
    const redirectUrl = urls.find((url) => url.shortUrl === shortUrl)
    console.log(redirectUrl)
    if (redirectUrl) {
        res.redirect(301, redirectUrl.longUrl)
    }
    else {
        res.status(404).json({
            error: 'Wrong url'
        })
    }
    
})

app.use((req, res) => {
    res.status(404).json({
        error: 'Not found'
    })
})  

const PORT = process.env.PORT || 3001
app.listen(PORT)