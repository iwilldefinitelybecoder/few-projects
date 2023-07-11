const port = 8000
const express  = require('express')
const cheerio  = require('cheerio')
const axios  = require('axios')
const { json } = require('express')
const cors  = require('cors')
const app = express()

app.use(cors())
let i = 0

app.get('/results',(req,res)=>{
    
    url = "https://www.theguardian.com/international"
    
    axios(url).then(response =>{
        const html = response.data
                const scraped = cheerio.load(html)
                const article = []
                scraped('.fc-item__title',html).each(function(){
                    const title = scraped(this).text()
                    const url = scraped(this).find('a').attr('href')
                    article.push({
                        title,
                        url,
                    })
    
                })
        res.json(article)
       
    }).catch(e => console.log(e.message))
i++
console.log(`connection number ${i}`)
})
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})




const port = 8000
const express  = require('express')
const cheerio  = require('cheerio')
const axios  = require('axios')
const { json } = require('express')
const cors  = require('cors')
const app = express()

app.use(cors())
let i = 0
const newsChannels = [
    {
    name:'TheGurdian'
    ,url:'https://www.theguardian.com/international'
    ,base:''
},
{
    name:'Thetimes'
    ,url:'https://www.thetimes.co.uk/search?source=search-page&q=climate'
    ,base:'https://www.thetimes.co.uk'
},
{
    name:'NDTV'
    ,url:'https://www.ndtv.com/search?searchtext=climate'
    ,base:''
},
]

const article = []
newsChannels.forEach(channels =>{axios.get(channels.url).then(response =>{
    const html = response.data
            const scraped = cheerio.load(html)
            scraped('a:contains("climate")',html).each(function(){
                const title = scraped(this).text()
                const url = scraped(this).attr('href')
                article.push({
                    title,
                    url:channels.base + url,
                    source:channels.name
                })

            })
console.log(article)
   
}).catch(e => console.log(e.message))
})

app.get('/results',(req,res)=>{
    res.send(article)
i++
console.log(`connection number ${i}`)
})
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})